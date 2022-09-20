import { gql, useQuery } from "@apollo/client";

const GET_ALLOCATION_DATA = gql`
  query getAllocation {
    allocations {
      id
      capacity
      createdAt
      department {
        id
        departmentName
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

export const useManagerAllocationData = () => {
  return useQuery(GET_ALLOCATION_DATA);
};
