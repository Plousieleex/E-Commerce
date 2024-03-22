import { deepOrange, amber, grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode: "light",
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontSize: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: "40px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: "8px", minHeight: "40px" },
        multiline: { height: "120px" },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { width: 36, height: 36 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: "#E3E9EF" },
      },
    },
  },
});
