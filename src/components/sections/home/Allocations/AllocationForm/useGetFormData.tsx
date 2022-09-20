import { gql, useQuery } from "@apollo/client";

const GET_FORM_DATA = gql`
  query getBuildingData {
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
    divisions {
      id
      divisionName
    }
  }
`;

export const useGetFormData = () => {
  return useQuery(GET_FORM_DATA);
};
