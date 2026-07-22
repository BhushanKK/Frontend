import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    OutlinedInput,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    Badge,
    Avatar,
    Typography,
    Menu,
    Divider,
} from "@mui/material";

import {
    Menu as MenuIcon,
    Search,
    NotificationsNone,
    Person,
    LockReset,
    Logout,
} from "@mui/icons-material";

import { drawerWidth } from "./Sidebar";
import { useAuthStore } from "../../store/authStore";
import { useLanguageStore } from "../../store/languageStore";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({
    onMenuClick,
}: HeaderProps) {

    const { t } = useTranslation("common");

    const navigate = useNavigate();

    const logout = useAuthStore((s) => s.logout);

    const language = useLanguageStore((s) => s.language);
    const setLanguage = useLanguageStore((s) => s.setLanguage);

    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(null);

    const handleLogout = () => {
        setAnchorEl(null);
        logout();
        navigate("/login", {
            replace: true,
        });
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },

                bgcolor: "#F4F7FC",
                color: "text.primary",

                borderRadius: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,

                boxShadow: "none",
                borderBottom: "1px solid #E8EDF7",

                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "72px !important",
                    px: 3,
                    gap: 2,
                }}
            >

                {/* Left Section */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        gap: 2,
                    }}
                >
                    <IconButton
                        onClick={onMenuClick}
                        sx={{
                            display: {
                                xs: "flex",
                                sm: "none",
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <OutlinedInput
                        size="small"
                        placeholder={t("search")}
                        startAdornment={
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        }
                        sx={{
                            width: {
                                xs: "100%",
                                md: 340,
                            },
                            bgcolor: "#FFFFFF",
                            borderRadius: "18px",
                            height: 46,
                            boxShadow: "0 2px 8px rgba(0,0,0,.04)",

                            "& fieldset": {
                                borderColor: "#EEF2F7",
                            },

                            "&:hover fieldset": {
                                borderColor: "#2563EB",
                            },

                            "&.Mui-focused fieldset": {
                                borderColor: "#2563EB",
                            },
                        }}
                    />
                </Box>

                {/* Language */}

                <FormControl size="small">
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
                        sx={{
                            bgcolor: "#FFFFFF",
                            borderRadius: "18px",
                            minWidth: 130,
                            height: 46,

                            "& fieldset": {
                                borderColor: "#EEF2F7",
                            },
                        }}
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

                {/* Notification */}

                <IconButton
                    sx={{
                        width: 46,
                        height: 46,
                        bgcolor: "#FFFFFF",
                        border: "1px solid #EEF2F7",

                        "&:hover": {
                            bgcolor: "#F8FAFD",
                        },
                    }}
                >
                    <Badge
                        badgeContent={5}
                        color="error"
                    >
                        <NotificationsNone />
                    </Badge>
                </IconButton>

                <Divider
                    orientation="vertical"
                    flexItem
                />

                {/* Profile */}

                <Box
                    onClick={(e) =>
                        setAnchorEl(
                            e.currentTarget
                        )
                    }
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                        px: 1,

                        "&:hover": {
                            opacity: 0.9,
                        },
                    }}
                >
                    <Avatar
                        sx={{
                            width: 42,
                            height: 42,
                            bgcolor: "#2563EB",
                            fontWeight: 700,
                        }}
                    >
                        A
                    </Avatar>

                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: 15,
                                lineHeight: 1.2,
                            }}
                        >
                            Administrator
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            Super Admin
                        </Typography>
                    </Box>
                </Box>

                {/* Profile Menu */}

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    slotProps={{
                        paper: {
                            sx: {
                                borderRadius: 3,
                                minWidth: 220,
                                mt: 1,
                                boxShadow: "0 10px 30px rgba(0,0,0,.12)",
                            },
                        },
                    }}
                >
                    <MenuItem
                        onClick={() =>
                            setAnchorEl(null)
                        }
                    >
                        <Person
                            sx={{ mr: 1.5 }}
                        />
                        {t("myProfile")}
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            navigate(
                                "/change-password"
                            );
                        }}
                    >
                        <LockReset
                            sx={{ mr: 1.5 }}
                        />
                        {t("changePassword")}
                    </MenuItem>

                    <Divider />

                    <MenuItem
                        onClick={handleLogout}
                        sx={{
                            color: "error.main",
                        }}
                    >
                        <Logout
                            sx={{ mr: 1.5 }}
                        />
                        {t("logout")}
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    );
}