import { gql, useQuery } from "@apollo/client";

const GET_CAPACITY_DATA = gql`
  query getCapacity {
    capacity {
      id
      capacity
      createdAt
      division {
        id
        divisionName
      }
      building {
        id
        buildingName
      }
      floor {
        id
        floorNo
      }
      wing {
        id
        wingName
      }
    }
  }
`;

export const useCentralCapacityData = () => {
  return useQuery(GET_CAPACITY_DATA);
};
