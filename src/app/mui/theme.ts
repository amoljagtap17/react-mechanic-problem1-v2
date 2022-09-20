import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

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
      styleOverrides: {
        root: {
          "&.MuiPickersDay-root": {
            borderRadius: 0,
          },
        },
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
        contained: ({ theme }) => ({
          borderRadius: 0,
          [theme.breakpoints.down("sm")]: {
            display: "block",
            width: "100%",
          },
          [theme.breakpoints.up("sm")]: {
            minWidth: "192px",
          },
        }),
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
      styleOverrides: {
        paper: {
          boxShadow: "none",
          maxHeight: "250px",
          border: "1px solid #000",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          maring: 0,
          marginTop: "8px",
        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        disableGutters: true,
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          padding: "14px 40px 9px 10px",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        MenuProps: {
          disablePortal: true,
        },
        IconComponent: ExpandMoreIcon,
      },
    },
    MuiRadio: {
      defaultProps: {
        disableFocusRipple: true,
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiDrawer: {
      defaultProps: {
        disablePortal: true,
        elevation: 0,
        ModalProps: {
          disablePortal: true,
          disableScrollLock: true,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(_theme);
