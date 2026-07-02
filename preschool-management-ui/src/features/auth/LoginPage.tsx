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

export default function LoginPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#2563EB 0%,#4F46E5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Container maxWidth="md">
                <Card
                    elevation={8}
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                    }}
                >
                    <Grid container>
                        {/* Left Side */}

                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                background:
                                    "linear-gradient(180deg,#2563EB,#1D4ED8)",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 4,
                            }}
                        >
                            <Box>
                                <SchoolIcon
                                    sx={{
                                        fontSize: 54,
                                        mb: 2,
                                    }}
                                />

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    School ERP
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 1,
                                        mb: 3,
                                        opacity: 0.9,
                                        fontSize: 14,
                                    }}
                                >
                                    Smart School Management System
                                </Typography>

                                <Box
                                    sx={{
                                        width: 240,
                                        height: 180,
                                        borderRadius: 3,
                                        background: "rgba(255,255,255,.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 600,
                                        fontSize: 16,
                                        mx: "auto",
                                    }}
                                >
                                    3D School Illustration
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right Side */}

                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 4,
                                background: "#fff",
                            }}
                        >
                            <CardContent
                                sx={{
                                    width: "100%",
                                    maxWidth: 340,
                                    p: "0 !important",
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