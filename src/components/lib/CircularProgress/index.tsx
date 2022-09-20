import { Box, CircularProgress as MUICircularProgress } from "@mui/material";

export const CircularProgress = () => {
  return (
    <Box
      minHeight="100%"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <MUICircularProgress size={100} thickness={6} disableShrink />
    </Box>
  );
};
