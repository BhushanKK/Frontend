import { useEffect, useState } from "react";
import type { SidebarMenu } from "../../masters/menu/utils/SidebarMenu";
import { getMenus } from "../../api/menuApi";
import { buildMenuTree } from "../../utils/menuTree";
import { Box, Collapse, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getIcon } from "../../utils/iconHelper";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});
  const [menus, setMenus] = useState<SidebarMenu[]>([]);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      const response = await getMenus(true);
      setMenus(
        buildMenuTree(response.data)
      );
    }
    catch (error) {
      console.error(
        "Failed to load menus",
        error
      );
    }
  };
  const toggleMenu = (menuId: number) => {
    setOpenMenus(previous => ({
      ...previous,
      [menuId]: !previous[menuId]
    }));
  };

  const drawerContent = (
    <Box>
      <Box
        sx={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          px: 2,
          backgroundColor: "#ffffff"
        }}
      >
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            flexGrow: 1,
            letterSpacing: "0.2px",
            color: "#2563EB"
          }}
        >
          School ERP
        </Typography>
      </Box>
      <Divider />
      <List
        sx={{
          py: 1
        }}
      >
        {
          menus.map(menu => (
            <Box
              key={menu.menuId}
            >
              {
                menu.children.length === 0 ?
                  (
                    <ListItemButton
                      component={NavLink}
                      to={
                        menu.menuUrl ?? "#"
                      }
                      onClick={onClose}
                    >
                      <ListItemIcon>
                        {
                          getIcon(menu.icon)
                        }
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          menu.menuName
                        }
                      />
                    </ListItemButton>
                  )
                  :
                  (
                    <Box>
                      <ListItemButton
                        onClick={() =>
                          toggleMenu(menu.menuId)
                        }
                      >
                        <ListItemIcon>
                          {
                            getIcon(menu.icon)
                          }
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            menu.menuName
                          }
                        />

                        {
                          openMenus[menu.menuId]
                            ?
                            <ExpandLess />
                            :
                            <ExpandMore />
                        }
                      </ListItemButton>

                      <Collapse
                        in={
                          openMenus[menu.menuId]
                        }
                        timeout="auto"
                        unmountOnExit
                      >
                        <List disablePadding>
                          {
                            menu.children.map(child => (
                              <ListItemButton
                                key={
                                  child.menuId
                                }
                                sx={{
                                  pl: 4
                                }}
                                component={NavLink}
                                to={
                                  child.menuUrl ?? "#"
                                }
                                onClick={onClose}
                              >
                                <ListItemIcon>
                                  {
                                    getIcon(child.icon)
                                  }
                                </ListItemIcon>

                                <ListItemText
                                  primary={
                                    child.menuName
                                  }
                                />
                              </ListItemButton>
                            ))
                          }
                        </List>
                      </Collapse>
                    </Box>
                  )
              }
            </Box>
          ))
        }
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Sidebar */}
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
            width: drawerWidth
          }
        }}
      >
        {
          drawerContent
        }
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
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
            top: 0,
            height: "100vh"
          }
        }}
        open

      >
        {
          drawerContent
        }
      </Drawer>
    </>
  );
}

export default Sidebar;