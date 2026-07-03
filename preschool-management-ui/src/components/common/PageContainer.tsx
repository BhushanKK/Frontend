import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f5f7fb",
        minHeight: "100%",
      }}
    >
      {children}
    </Box>
  );
}