import type { NextPage } from "next";
import { Grid } from "@mui/material";
import { Intro, Login } from "components/sections";

const LandingPage: NextPage = () => {
  return (
    <Grid
      container
      spacing={2}
      minHeight="75vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} md={6}>
        <Intro />
      </Grid>
      <Grid item xs={12} md={6}>
        <Login />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
