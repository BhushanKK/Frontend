import { Button, Paper, Typography, Stack } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <Stack
            sx={{
                height: "100vh",
                bgcolor: "#F4F7FC",
                justifyContent:"center",
                alignItems:"center"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 5,
                    textAlign: "center",
                    borderRadius: 3,
                    width: 420,
                }}
            >
                <LockOutlined
                    color="error"
                    sx={{
                        fontSize: 70,
                        mb: 2,
                    }}
                />

                <Typography
                    sx={{variant:"h4",
                    fontWeight:700}}
                    gutterBottom
                >
                    403
                </Typography>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Unauthorized Access
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    You don't have permission to access this page.
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </Button>
            </Paper>
        </Stack>
    );
}