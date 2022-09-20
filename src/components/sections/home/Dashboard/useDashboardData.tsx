import { gql, useQuery } from "@apollo/client";

const GET_DASHBOARD_DATA = gql`
  query Capacity {
    capacity {
      assignedCapacity
    }
    seatCount
  }
`;

export const useDashboardData = () => {
  return useQuery(GET_DASHBOARD_DATA);
};
