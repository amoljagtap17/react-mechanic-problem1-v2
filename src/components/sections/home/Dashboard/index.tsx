import { Grid } from "@mui/material";
import { StatsCard, CircularProgress } from "components/lib";
import { useDashboardData } from "./useDashboardData";

export const Dashboard = () => {
  const getDashboardData = useDashboardData();

  if (getDashboardData.loading) {
    return <CircularProgress />;
  }

  const { totalAssignedCapacity, totalSeatsCount } = getDashboardData.data;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <StatsCard label="Total Seats" count={totalSeatsCount} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsCard label="Allocated Seats" count={totalAssignedCapacity} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsCard
          label="Available Seats"
          count={totalSeatsCount - totalAssignedCapacity}
        />
      </Grid>
    </Grid>
  );
};
