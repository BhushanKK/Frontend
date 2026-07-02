import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";

import LoginForm from "./LoginForm";

// Uncomment after adding your assets
// import Logo from "../../assets/logo.png";
// import LoginIllustration from "../../assets/login.svg";

export default function LoginPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Card
                    elevation={10}
                    sx={{
                        borderRadius: 5,
                        overflow: "hidden",
                    }}
                >
                    <Grid container sx={{ minHeight: 650 }}>
                        {/* Left Section */}

                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                background:
                                    "linear-gradient(180deg,#2563EB,#1D4ED8)",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 6,
                            }}
                        >
                            <Box
                                component="div"
                                sx={{
                                    textAlign: "center",
                                }}
                            >
                                {/* Replace with your logo */}

                                {/* <img
    src={Logo}
    alt="Logo"
    width={80}
  /> */}

                                <SchoolIcon
                                    sx={{
                                        fontSize: 80,
                                        mb: 3,
                                    }}
                                />

                                <Typography
                                    component="h1"
                                    variant="h3"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                    }}
                                >
                                    School ERP
                                </Typography>

                                <Typography
                                    component="p"
                                    variant="h6"
                                    sx={{
                                        opacity: 0.9,
                                        mb: 4,
                                    }}
                                >
                                    Smart School Management System
                                </Typography>

                                {/* Replace with your illustration */}

                                {/* <img
      src={LoginIllustration}
      alt="Illustration"
      style={{
        width: "100%",
        maxWidth: 380,
      }}
  /> */}

                                <Box
                                    component="div"
                                    sx={{
                                        width: "100%",
                                        maxWidth: 380,
                                        height: 280,
                                        borderRadius: 4,
                                        background: "rgba(255,255,255,.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 22,
                                        fontWeight: 600,
                                    }}
                                >
                                    3D School Illustration
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right Section */}

                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#ffffff",
                                p: 6,
                            }}
                        >
                            <CardContent
                                sx={{
                                    width: "100%",
                                    maxWidth: 420,
                                }}
                            >
                                <LoginForm />
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </Box>
    );
}