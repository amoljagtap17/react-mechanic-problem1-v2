import { gql, useQuery } from "@apollo/client";

const GET_SUPER_USERS = gql`
  query getSuperUsers {
    super_users {
      email
      department {
        departmentName
      }
    }
  }
`;

export const useGetSuperUsers = () => {
  return useQuery(GET_SUPER_USERS);
};
