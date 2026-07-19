import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    FormControl,
    IconButton,
    Menu,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    Menu as MenuIcon,
    NotificationsNone,
    Logout,
    Person,
    LockReset,
    Translate,
} from "@mui/icons-material";

import { useAuthStore } from "../../store/authStore";
import { useLanguageStore } from "../../store/languageStore";
import { drawerWidth } from "./Sidebar";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({
    onMenuClick,
}: HeaderProps) {
    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    const language = useLanguageStore((state) => state.language);
    const setLanguage = useLanguageStore((state) => state.setLanguage);

    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleProfileClick = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangePassword = () => {
        handleClose();
        navigate("/change-password");
    };

    const handleLogout = () => {
        handleClose();
        logout();
        navigate("/login", {
            replace: true,
        });
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: {
                    sm: `calc(100% - ${drawerWidth}px)`,
                },
                ml: {
                    sm: `${drawerWidth}px`,
                },
                backgroundColor: "#fff",
                color: "#111827",
                borderBottom: "1px solid #E5E7EB",
                boxShadow: "none",
                zIndex: (theme) =>
                    theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "64px !important",
                    px: 3,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {/* Mobile Menu */}
                <IconButton
                    edge="start"
                    onClick={onMenuClick}
                    sx={{
                        mr: 2,
                        display: {
                            xs: "flex",
                            sm: "none",
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Application Name */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: "#111827",
                        fontSize: "20px",
                    }}
                >
                    School Management System
                </Typography>

                {/* Right Section */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    {/* Language */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Translate
                            fontSize="small"
                            sx={{
                                color: "#6B7280",
                            }}
                        />

                        <FormControl
                            size="small"
                            sx={{
                                minWidth: 120,
                            }}
                        >
                            <Select
                                value={language}
                                onChange={(e) =>
                                    setLanguage(
                                        e.target.value as
                                            | "en"
                                            | "mr"
                                            | "hi"
                                    )
                                }
                            >
                                <MenuItem value="en">
                                    English
                                </MenuItem>

                                <MenuItem value="mr">
                                    मराठी
                                </MenuItem>

                                <MenuItem value="hi">
                                    हिन्दी
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Notification */}
                    <IconButton>
                        <Badge
                            badgeContent={5}
                            color="error"
                            sx={{
                                "& .MuiBadge-badge": {
                                    fontSize: "10px",
                                },
                            }}
                        >
                            <NotificationsNone />
                        </Badge>
                    </IconButton>

                    {/* Profile */}
                    <IconButton
                        onClick={handleProfileClick}
                    >
                        <Avatar
                            sx={{
                                width: 38,
                                height: 38,
                                bgcolor: "#2563EB",
                                fontSize: "16px",
                            }}
                        >
                            A
                        </Avatar>
                    </IconButton>
                </Box>

                {/* Profile Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Person sx={{ mr: 1 }} />
                        My Profile
                    </MenuItem>

                    <MenuItem
                        onClick={handleChangePassword}
                    >
                        <LockReset sx={{ mr: 1 }} />
                        Change Password
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