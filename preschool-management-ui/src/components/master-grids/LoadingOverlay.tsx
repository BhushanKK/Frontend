import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingOverlay() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                gap: 1,
            }}
        >
            <CircularProgress size={28} />

            <Typography
                variant="body2"
                color="text.secondary"
            >
                Loading data...
            </Typography>
        </Box>
    );
}