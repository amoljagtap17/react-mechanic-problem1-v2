import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types";

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: join(process.cwd(), "generated/schema.graphql"),
  },
  contextType: {
    module: join(process.cwd(), "src/app/graphql/context.ts"),
    alias: "Context",
    export: "Context",
  },
});
