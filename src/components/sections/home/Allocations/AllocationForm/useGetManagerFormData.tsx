import { gql, useQuery } from "@apollo/client";

const GET_MANAGER_FORM_DATA = gql`
  query getManagerFormData($departmentName: String!) {
    buildings {
      id
      buildingName
      floors {
        id
        floorNo
        wings {
          id
          wingName
        }
      }
    }
    departmentsForCurrentUser(departmentName: $departmentName) {
      id
      departmentName
    }
  }
`;

export const useGetManagerFormData = (departmentName: string) => {
  return useQuery(GET_MANAGER_FORM_DATA, {
    variables: {
      departmentName,
    },
  });
};
