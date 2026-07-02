import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";

import {
    Menu as MenuIcon,
    NotificationsNone,
    Logout,
    Person,
} from "@mui/icons-material";

import { drawerWidth } from "./Sidebar";
import { useAuthStore } from "../../store/authStore";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleProfileClick = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                backgroundColor: "#ffffff",
                color: "#000",
                width: {
                    md: `calc(100% - ${drawerWidth}px)`,
                },
                ml: {
                    md: `${drawerWidth}px`,
                },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{
                        display: {
                            md: "none",
                        },
                        mr: 2,
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 600,
                    }}
                >
                    School Management System
                </Typography>

                <IconButton color="inherit">
                    <Badge badgeContent={5} color="error">
                        <NotificationsNone />
                    </Badge>
                </IconButton>

                <Box
                    component="div"
                    sx={{ ml: 2 }}
                >
                    <IconButton onClick={handleProfileClick}>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            A
                        </Avatar>
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Person sx={{ mr: 1 }} />
                        My Profile
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>
                        <Logout sx={{ mr: 1 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}