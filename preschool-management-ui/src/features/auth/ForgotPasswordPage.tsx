import { Box, Card, CardContent, Container, Grid } from "@mui/material";
import schoolImage from "../../assets/images/school-3d.png";
import ForgotPasswordForm from "./ForgotPasswordForm";


export default function ForgotPasswordPage() {
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
            <Container maxWidth="md">
                <Card
                    elevation={12}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        minHeight: 500,
                    }}
                >
                    <Grid container sx={{ height: "100%" }}>
                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                background: "linear-gradient(180deg,#2563EB,#1D4ED8)",
                                overflow: "hidden",
                                minHeight: 500,
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
                                }}
                            />
                        </Grid>

                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                backgroundColor: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 5,
                                minHeight: 500,
                            }}
                        >
                            <CardContent
                                sx={{
                                    width: "100%",
                                    maxWidth: 360,
                                    p: "0 !important",
                                }}
                            >
                                <ForgotPasswordForm />
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </Box>
    );
}