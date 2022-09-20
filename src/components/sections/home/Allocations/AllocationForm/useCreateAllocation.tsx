import { gql, useMutation } from "@apollo/client";

const CREATE_ALLOCATION = gql`
  mutation createAllocation($data: AllocationInputType!) {
    createAllocation(data: $data) {
      id
      createdAt
      departmentId
      buildingId
      floorId
      wingId
    }
  }
`;

export const useCreateAllocation = () => {
  return useMutation(CREATE_ALLOCATION);
};
