import { Box, Typography, Stack } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                px: 3,
                py: 1.5,
                bgcolor: "background.paper",
                borderTop: "1px solid",
                borderColor: "divider",
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                sx={{justifyContent:"space-between",
                alignItems:"center",
                spacing:1}}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    © {new Date().getFullYear()}{" "}
                    <strong>GurukulX</strong>. All Rights Reserved.
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Smart School Management System • Version 1.0.0
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Powered by GurukulX Team
                </Typography>
            </Stack>
        </Box>
    );
}