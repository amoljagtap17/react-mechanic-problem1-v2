import type { NormalizedCacheObject } from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash.isequal";
import { useMemo } from "react";
import { ApolloClient, from, InMemoryCache, HttpLink } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";

interface PageProps {
  props?: Record<string, any>;
}

export const APOLLO_STATE_PROPERTY_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

type SchemaContext =
  | SchemaLink.ResolverContext
  | SchemaLink.ResolverContextFunction;

function createIsomorphLink(ctx?: SchemaContext) {
  if (typeof window === "undefined") {
    const { schema } = require("../graphql/schema");

    return new SchemaLink({ schema, context: ctx });
  } else {
    const httpLink = new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    });

    return from([httpLink]);
  }
}

function createApolloClient(ctx?: SchemaContext) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(ctx || undefined),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, ctx = undefined) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge(target, source) {
        return [
          ...source,
          ...target.filter((d) => source.every((s) => !isEqual(d, s))),
        ];
      },
    });

    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: PageProps
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: PageProps) {
  // @ts-ignore
  const state = pageProps[APOLLO_STATE_PROPERTY_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
}
