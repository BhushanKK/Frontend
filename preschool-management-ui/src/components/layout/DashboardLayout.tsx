import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

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
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    }}
>
    <Toolbar />

    <Box
        sx={{
            flex: 1,
            p: 3,
            bgcolor: "#F4F7FC",
        }}
    >
        <Outlet />
    </Box>

    <Footer />
</Box>
        </Box>
    );
}