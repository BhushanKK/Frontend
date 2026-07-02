import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
} from "@mui/material";

import LoginForm from "./LoginForm";
import schoolImage from "../../assets/images/school-3d.png";

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
                p: 2,
            }}
        >
            <Container maxWidth="lg">
                <Card
                    elevation={12}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        minHeight: 600,
                    }}
                >
                    <Grid container sx={{ height: "100%" }}>
                        {/* Left Side */}
                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                background: "linear-gradient(180deg,#2563EB,#1D4ED8)",
                                overflow: "hidden",
                                minHeight: 600,
                            }}
                        >
                            <Box
                                component="img"
                                src={schoolImage}
                                alt="School ERP"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </Grid>

                        {/* Right Side */}
                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                backgroundColor: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 5,
                                minHeight: 600,
                            }}
                        >
                            <CardContent
                                sx={{
                                    width: "100%",
                                    maxWidth: 360,
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