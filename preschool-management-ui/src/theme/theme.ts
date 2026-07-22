import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#2563EB",
            light: "#4F8EF7",
            dark: "#1D4ED8",
            contrastText: "#FFFFFF",
        },

        secondary: {
            main: "#7C3AED",
            light: "#A78BFA",
            dark: "#6D28D9",
        },

        success: {
            main: "#16A34A",
        },

        warning: {
            main: "#F59E0B",
        },

        error: {
            main: "#EF4444",
        },

        info: {
            main: "#0EA5E9",
        },

        background: {
            default: "#F5F7FC",
            paper: "#FFFFFF",
        },

        text: {
            primary: "#1F2937",
            secondary: "#6B7280",
        },

        divider: "#E5E7EB",
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
            fontWeight: 700,
        },

        h6: {
            fontWeight: 600,
        },

        subtitle1: {
            fontWeight: 600,
        },

        subtitle2: {
            fontWeight: 500,
        },

        body1: {
            fontSize: "0.95rem",
        },

        body2: {
            color: "#6B7280",
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
            letterSpacing: 0.2,
        },
    },

    shape: {
        borderRadius: 16,
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#F5F7FC",
                    color: "#1F2937",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    border: "1px solid #EEF2F7",
                    boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
                    overflow: "hidden",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    height: 40,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    boxShadow: "none",
                },

                contained: {
                    background:
                        "linear-gradient(90deg,#2563EB 0%,#4F8EF7 100%)",

                    "&:hover": {
                        background:
                            "linear-gradient(90deg,#1D4ED8 0%,#2563EB 100%)",
                        boxShadow: "0 8px 20px rgba(37,99,235,.25)",
                    },
                },

                outlined: {
                    borderColor: "#D1D5DB",

                    "&:hover": {
                        borderColor: "#2563EB",
                    },
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
                fullWidth: true,
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: "#FFFFFF",

                    "& fieldset": {
                        borderColor: "#E5E7EB",
                    },

                    "&:hover fieldset": {
                        borderColor: "#93C5FD",
                    },

                    "&.Mui-focused fieldset": {
                        borderColor: "#2563EB",
                        borderWidth: 2,
                    },
                },

                input: {
                    padding: "11px 14px",
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    color: "#1F2937",
                    boxShadow: "0 2px 16px rgba(0,0,0,.05)",
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: "none",
                    background:
                        "linear-gradient(180deg,#1E3A8A 0%,#2B4DB8 100%)",
                    color: "#FFFFFF",
                },
            },
        },

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    margin: "4px 12px",
                    borderRadius: 12,
                    minHeight: 46,

                    "&:hover": {
                        backgroundColor: "rgba(255,255,255,.10)",
                    },

                    "&.Mui-selected": {
                        background:
                            "linear-gradient(90deg,#4F8EF7,#6C7CFF)",

                        color: "#FFFFFF",

                        "&:hover": {
                            background:
                                "linear-gradient(90deg,#4F8EF7,#6C7CFF)",
                        },
                    },
                },
            },
        },

        MuiAvatar: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                },
            },
        },

        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 20,
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontWeight: 600,
                },
            },
        },

        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 8,
                    fontSize: "0.8rem",
                },
            },
        },

        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#EEF2F7",
                },
            },
        },
    },
});

export default theme;