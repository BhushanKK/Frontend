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
import { ExpandLess, ExpandMore} from "@mui/icons-material";
import type { SidebarMenu } from "../../masters/menu/utils/SidebarMenu";
import type { Menu } from "../../masters/menu/types/menu";
import { getMenus } from "../../api/menuApi";
import { buildMenuTree } from "../../utils/menuTree";
import { getIcon } from "../../utils/iconHelper";
import { usePermissionStore } from "../../store/permissionStore";
import logo from "../../assets/images/logo.png";
export const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen,  onClose}: SidebarProps) {

  const [menus, setMenus] = useState<SidebarMenu[]>([]);
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

  const permissions = usePermissionStore(
    (state) => state.permissions
  );

  const loadMenus = useCallback(async () => {
    try {
      const response = await getMenus(true);

      const menuTree = buildMenuTree(
        permissions,
        response.data as Menu[]
      );

      setMenus(menuTree);
    } catch (error) {
      console.error("Failed to load menus", error);
    }
  }, [permissions]);

  useEffect(() => {
    if (permissions.length > 0) {
      loadMenus();
    }
  }, [loadMenus, permissions]);

  const toggleMenu = (menuId: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const drawerContent = (
    <Box>
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 2,
          backgroundColor: "#fff",
        }}
      >
        <Box
    component="img"
    src={logo}
    alt="Logo"
    sx={{
      height: 60,
      width: "auto",
      objectFit: "contain",
    }}
  />
      </Box>

      <Divider />

      <List sx={{ py: 1 }}>
        {menus.map((menu) => (
          <Box key={menu.menuId}>
            {menu.children.length === 0 ? (
              <ListItemButton
                component={NavLink}
                to={menu.menuUrl ?? "#"}
                onClick={onClose}
              >
                <ListItemIcon>
                  {getIcon(menu.icon)}
                </ListItemIcon>

                <ListItemText
                  primary={menu.menuName}
                />
              </ListItemButton>
            ) : (
              <>
                <ListItemButton
                  onClick={() =>
                    toggleMenu(menu.menuId)
                  }
                >
                  <ListItemIcon>
                    {getIcon(menu.icon)}
                  </ListItemIcon>

                  <ListItemText
                    primary={menu.menuName}
                  />

                  {openMenus[menu.menuId] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>

                <Collapse
                  in={openMenus[menu.menuId]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List disablePadding>
                    {menu.children.map((child) => (
                      <ListItemButton
                        key={child.menuId}
                        component={NavLink}
                        to={child.menuUrl ?? "#"}
                        sx={{ pl: 4 }}
                        onClick={onClose}
                      >
                        <ListItemIcon>
                          {getIcon(child.icon)}
                        </ListItemIcon>

                        <ListItemText
                          primary={child.menuName}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            height: "100vh",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}