import { Box, Container, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box bgcolor="primary.main" color="secondary.main" padding={4}>
      <Container maxWidth="lg">
        <Typography variant="body1">
          &copy; React Mechanic {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};
