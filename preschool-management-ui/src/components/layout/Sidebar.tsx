import { useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  AccountTree,
  Dashboard,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

export const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  text: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const menus: MenuItem[] = [
  {
    text: "Dashboard",
    icon: <Dashboard fontSize="small" />,
    path: "/dashboard",
  },
  {
    text: "Masters",
    icon: <AccountTree fontSize="small" />,
    children: [
      { text: "Academic Year Master", path: "/masters/Academic Year" },
      { text: "Financial Year Master", path: "/masters/Financial Year" },
      { text: "Religion Master", path: "/masters/Commitee" },
      { text: "Commitee Master", path: "/masters/School Details" },
      { text: "Holidays Master", path: "/masters/Holidays" },
      { text: "Religion Master", path: "/masters/religion" },
      { text: "Category Master", path: "/masters/category" },
      { text: "Caste Master", path: "/masters/caste" },

    ],
  },
];

function DrawerContent({ onClose }: { onClose: () => void }) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <>
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: 3,
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: 700,
          }}
        >
          School ERP
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ py: 1 }}>
        {menus.map((menu) => {
          // Normal Menu
          if (!menu.children) {
            return (
              <ListItemButton
                key={menu.text}
                component={NavLink}
                to={menu.path!}
                onClick={onClose}
                sx={{
                  mx: 1.5,
                  my: 0.5,
                  borderRadius: 2,

                  "&.active": {
                    bgcolor: "primary.main",
                    color: "#fff",

                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 38 }}>
                  {menu.icon}
                </ListItemIcon>

                <ListItemText primary={menu.text} />
              </ListItemButton>
            );
          }

          // Expandable Menu
          return (
            <Box key={menu.text}>
              <ListItemButton
                onClick={() => toggleMenu(menu.text)}
                sx={{
                  mx: 1.5,
                  my: 0.5,
                  borderRadius: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: 38 }}>
                  {menu.icon}
                </ListItemIcon>

                <ListItemText primary={menu.text} />

                {openMenus[menu.text] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>

              <Collapse
                in={openMenus[menu.text]}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding>
                  {menu.children.map((child) => (
                    <ListItemButton
                      key={child.text}
                      component={NavLink}
                      to={child.path!}
                      onClick={onClose}
                      sx={{
                        pl: 6,
                        py: 0.8,

                        "&.active": {
                          bgcolor: "#E3F2FD",
                          color: "primary.main",
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontSize: 13,
                            }}
                          >
                            {child.text}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </>
  );
}

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  const drawerContent = <DrawerContent onClose={onClose} />;

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: drawerWidth },
        flexShrink: { lg: 0 },
      }}
    >
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: "1px solid #ECECEC",
            boxSizing: "border-box",
          },
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
            lg: "block",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: "1px solid #ECECEC",
            backgroundColor: "#fff",
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}