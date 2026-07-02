import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar, { drawerWidth } from "./Sidebar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F5F7FB",
      }}
    >
      {/* Header */}
      <Header onMenuClick={handleDrawerToggle} />

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,

          width: {
            xs: "100%",
            lg: `calc(100% - ${drawerWidth}px)`,
          },

          display: "flex",
          flexDirection: "column",

          minHeight: "100vh",

          overflowX: "hidden",

          transition: "all .3s ease",

          bgcolor: "#F5F7FB",
        }}
      >
        {/* Space for Fixed Header */}
        <Toolbar
          sx={{
            minHeight: {
              xs: 64,
              sm: 64,
            },
          }}
        />

        {/* Page Content */}
        <Box
          sx={{
            flex: 1,

            p: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },

            width: "100%",

            maxWidth: "100%",

            mx: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}