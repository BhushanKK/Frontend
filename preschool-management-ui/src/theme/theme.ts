import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2563EB",
        },
        secondary: {
            main: "#0F172A",
        },
        success: {
            main: "#16A34A",
        },
        background: {
            default: "#F5F7FB",
            paper: "#FFFFFF",
        },
    },

    typography: {
        fontFamily: `"Poppins","Roboto","Helvetica","Arial",sans-serif`,
        h3: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 15,
                    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    height: 36,
                    fontSize: "12px",
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                size: "small",
                fullWidth: true,
            },
        },
    },
});

export default theme;