import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const IntroText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 400,
  fontFamily: "'Poppins', sans-serif",
  [theme.breakpoints.up("xs")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "4.5rem",
  },
}));
