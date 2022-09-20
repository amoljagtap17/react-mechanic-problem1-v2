import { Grid } from "@mui/material";
import { StatsCard, CircularProgress } from "components/lib";
import { useDashboardData } from "./useDashboardData";

export const Dashboard = () => {
  const getDashboardData = useDashboardData();

  if (getDashboardData.loading) {
    return <CircularProgress />;
  }

  const { capacity, seatCount } = getDashboardData.data;

  const currentAllocated = capacity[0].assignedCapacity;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <StatsCard label="Available Seats" count={seatCount} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsCard label="Current Allocations" count={currentAllocated} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsCard
          label="Available Allocations"
          count={seatCount - currentAllocated}
        />
      </Grid>
    </Grid>
  );
};
