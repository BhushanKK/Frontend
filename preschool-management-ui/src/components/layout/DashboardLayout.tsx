import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(prev => !prev);
    };

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "#F5F7FB",
                overflowX: "hidden",
                overflowY: "auto",
            }}
        >
            {/* Header */}
            <Header
                onMenuClick={handleDrawerToggle}
            />

            {/* Sidebar */}
            <Sidebar
                mobileOpen={mobileOpen}
                onClose={handleDrawerToggle}
            />

            {/* Main Content */}
            <Box
    component="main"
    sx={{
        flexGrow: 1,
        background: "#F5F7FB",
        minHeight: "100vh",
        p: 1.5,
        overflow: "hidden",
    }}
>
                {/* Header Spacer */}
                <Toolbar />

                {/* Page Content */}
                <Box
    sx={{
        width: "100%",
        height: "100%",
    }}
>
    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}