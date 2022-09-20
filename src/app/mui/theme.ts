import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const _theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  palette: {
    mode: "light",
    primary: {
      main: grey[900],
    },
    secondary: {
      main: "#fff",
    },
    text: {
      primary: "#424851",
    },
    background: {
      default: "#F9F9F9",
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        square: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
        disableTouchRipple: true,
        size: "large",
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiCard: {
      defaultProps: {
        raised: false,
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 3px 15px -10px rgb(0 0 0 / 50%)",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiPopper: {
      defaultProps: {
        disablePortal: true,
        keepMounted: true,
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});

export const theme = responsiveFontSizes(_theme);
