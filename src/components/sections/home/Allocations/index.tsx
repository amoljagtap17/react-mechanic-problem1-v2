import { Grid } from "@mui/material";
import { AllocationForm } from "./AllocationForm";
import { AllocationList } from "./AllocationList";

interface IAllocationsProps {
  role: "ADMIN" | "CENTRAL";
}

export const Allocations = ({ role }: IAllocationsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <AllocationForm role={role} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <AllocationList role={role} />
      </Grid>
    </Grid>
  );
};
