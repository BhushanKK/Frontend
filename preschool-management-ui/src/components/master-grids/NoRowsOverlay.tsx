import { Box, Typography } from "@mui/material";

export default function NoRowsOverlay() {
  return (
    <Box sx={{
      height:"100%",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
      }}
    >
      <Typography color="text.secondary">
        No records found
      </Typography>
    </Box>
  );
}