import { gql, useMutation } from "@apollo/client";

const CREATE_CAPACITY = gql`
  mutation CreateCapacity($data: CapacityInputType!) {
    createCapacity(data: $data) {
      id
      createdAt
      divisionId
      buildingId
      floorId
      wingId
    }
  }
`;

export const useCreateCapacity = () => {
  return useMutation(CREATE_CAPACITY);
};
