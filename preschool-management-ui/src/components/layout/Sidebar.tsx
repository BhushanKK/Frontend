import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Box,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

import type { SidebarMenu } from "../../masters/menu/utils/SidebarMenu";
import type { Menu } from "../../masters/menu/types/menu";
import { getMenus } from "../../api/menuApi";
import { buildMenuTree } from "../../utils/menuTree";
import { getIcon } from "../../utils/iconHelper";
import { usePermissionStore } from "../../store/permissionStore";
import type { PaginationRequest } from "../../types/pagination";
import logo from "../../assets/images/logo.png";

export const drawerWidth = 280;

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({
    mobileOpen,
    onClose,
}: SidebarProps) {
    const { i18n } = useTranslation();

    const [menus, setMenus] = useState<SidebarMenu[]>([]);
    const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

    const permissions = usePermissionStore(
        (state) => state.permissions
    );

    const loadMenus = useCallback(async () => {
        try {
            const request: PaginationRequest = {
                pageNumber: 1,
                pageSize: 1000,
                filter: true,
                searchText: "",
            };

            const response = await getMenus(request);

            if (!response.success) {
                setMenus([]);
                return;
            }

            const tree = buildMenuTree(
                permissions,
                response.data.items as Menu[]
            );

            setMenus(tree);
        } catch (error) {
            console.error(error);
            setMenus([]);
        }
    }, [permissions]);

    useEffect(() => {
        if (permissions.length > 0) {
            loadMenus();
        }
    }, [permissions, i18n.language, loadMenus]);

    const toggleMenu = (id: number) => {
        setOpenMenus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const renderMenu = (
        menu: SidebarMenu,
        level = 0
    ) => {
        const hasChildren = menu.children.length > 0;

        if (!hasChildren) {
            return (
                <ListItemButton
                    key={menu.menuId}
                    component={NavLink}
                    to={menu.menuUrl ?? "#"}
                    onClick={onClose}
                    sx={{
                        mx: 1.5,
                        my: 0.4,
                        pl: 2 + level * 2.5,
                        borderRadius: 3,
                        color: "rgba(255,255,255,.90)",
                        "& .MuiListItemIcon-root": {
                            color: "inherit",
                            minWidth: 38,
                        },
                        "&:hover": {
                            bgcolor: "rgba(255,255,255,.12)",
                        },
                        "&.active": {
                            bgcolor: "rgba(255,255,255,.18)",
                            color: "#fff",
                            fontWeight: 700,
                            boxShadow: "0 8px 20px rgba(0,0,0,.18)",
                        },
                    }}
                >
                    <ListItemIcon>
                        {getIcon(menu.icon)}
                    </ListItemIcon>

                    <ListItemText
                        primary={
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                }}
                            >
                                {menu.menuName}
                            </Typography>
                        }
                    />
                </ListItemButton>
            );
        }

        return (
            <Box key={menu.menuId}>
                <ListItemButton
                    onClick={() => toggleMenu(menu.menuId)}
                    sx={{
                        mx: 1.5,
                        my: 0.4,
                        pl: 2 + level * 2.5,
                        borderRadius: 3,
                        color: "#fff",
                        "& .MuiListItemIcon-root": {
                            color: "#fff",
                            minWidth: 38,
                        },
                        "&:hover": {
                            bgcolor: "rgba(255,255,255,.12)",
                        },
                    }}
                >
                    <ListItemIcon>
                        {getIcon(menu.icon)}
                    </ListItemIcon>

                    <ListItemText
                        primary={
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                }}
                            >
                                {menu.menuName}
                            </Typography>
                        }
                    />

                    {openMenus[menu.menuId] ? (
                        <ExpandLess fontSize="small" />
                    ) : (
                        <ExpandMore fontSize="small" />
                    )}
                </ListItemButton>

                <Collapse
                    in={openMenus[menu.menuId]}
                    timeout="auto"
                    unmountOnExit
                >
                    <List disablePadding>
                        {menu.children.map((child) =>
                            renderMenu(child, level + 1)
                        )}
                    </List>
                </Collapse>
            </Box>
        );
    };

    const drawerContent = (
        <>
            <Box
                sx={{
                    height: 72,
                    minHeight: 72,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#FFFFFF",
                    borderBottom: "1px solid #E8EDF7",
                    boxSizing: "border-box",
                    px: 2,
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{
                        height: 70,
                        width: "auto",
                        objectFit: "contain",
                        display: "block",
                    }}
                />
            </Box>

            <Divider />

            <Box
                sx={{
                    mt: 1,
                    overflowY: "auto",
                    height: "calc(100vh - 72px)",
                    "&::-webkit-scrollbar": {
                        width: 6,
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "rgba(255,255,255,.25)",
                        borderRadius: 10,
                    },
                }}
            >
                <List>
                    {menus.map((menu) => renderMenu(menu))}
                </List>
            </Box>
        </>
    );

    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        borderRadius: 0,
                        borderRight: "1px solid #E5E7EB",
                        background:
                            "linear-gradient(180deg,#1E3A8A 0%,#2852C7 50%,#3366FF 100%)",
                        color: "#fff",
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: "none", sm: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        borderRadius: 0,
                        borderRight: "1px solid #E5E7EB",
                        background:
                            "linear-gradient(180deg,#1E3A8A 0%,#2852C7 50%,#3366FF 100%)",
                        color: "#fff",
                        overflowX: "hidden",
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
}