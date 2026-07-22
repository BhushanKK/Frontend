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
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { SidebarMenu } from "../../masters/menu/utils/SidebarMenu";
import type { Menu } from "../../masters/menu/types/menu";
import { getMenus } from "../../api/menuApi";
import { buildMenuTree } from "../../utils/menuTree";
import { getIcon } from "../../utils/iconHelper";
import { usePermissionStore } from "../../store/permissionStore";
import logo from "../../assets/images/logo.png";

export const drawerWidth = 280;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {

  const { i18n } = useTranslation();
  const [menus, setMenus] = useState<SidebarMenu[]>([]);
  const [openMenus, setOpenMenus] =
    useState<Record<number, boolean>>({});
  const permissions =
    usePermissionStore(
      state => state.permissions
    );

  const loadMenus = useCallback(async () => {
    try {
      const response =
        await getMenus(true);
      const menuTree =
        buildMenuTree(
          permissions,
          response.data as Menu[]
        );
      setMenus(menuTree);
    }
    catch (error) {
      console.error(
        "Failed to load menus",
        error
      );
    }
  }, [
    permissions
  ]);

  /*
    Reload sidebar whenever:
    - Permission changes
    - Language changes
  */
  useEffect(() => {
    if (permissions.length > 0) {
      loadMenus();
    }

  }, [
    permissions,
    i18n.language,
    loadMenus
  ]);

  const toggleMenu = (
    menuId: number
  ) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]:
        !prev[menuId]
    }));
  };

  const renderMenu = (
    menu: SidebarMenu,
    level: number = 0
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
            pl: 2 + (level * 2),
            "&.active": {
              bgcolor: "action.selected",
              color: "primary.main",
            },
          }}
        >
          <ListItemIcon>
            {getIcon(menu.icon)}
          </ListItemIcon>
          <ListItemText
            primary={menu.menuName}
          />
        </ListItemButton>
      );
    }

    return (
      <Box key={menu.menuId}>
        <ListItemButton
          onClick={() =>
            toggleMenu(menu.menuId)
          }
          sx={{
            pl: 2 + (level * 2),
          }}
        >
          <ListItemIcon>
            {getIcon(menu.icon)}
          </ListItemIcon>

          <ListItemText
            primary={menu.menuName} />
          {openMenus[menu.menuId] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse
          in={openMenus[menu.menuId]}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            {
              menu.children.map(child =>
                renderMenu(
                  child,
                  level + 1
                )
              )
            }
          </List>
        </Collapse>
      </Box>
    );
  };

  const drawerContent = (
    <Box>
      {/* Logo */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 2,
          bgcolor:
            "background.paper"
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 55,
            width: "auto",
            objectFit: "contain"
          }}
        />
      </Box>
      <Divider />

      <List sx={{ py: 1 }}>
        {
          menus.map(menu =>
            renderMenu(menu)
          )
        }
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: {
            xs: "block",
            sm: "none"
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            height: "100vh",

            background:
              "linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)",

            color: "#ffffff",

            borderRight: "none",
          }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            sm: "block"
          },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            height: "100vh",
            bgcolor:
              "#fff"
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}