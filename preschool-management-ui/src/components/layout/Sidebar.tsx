import {
  Box,
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
  Dashboard,
  School,
  People,
  Class,
  Payments,
  EventAvailable,
  Quiz,
  MenuBook,
  Settings,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

export const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const menus = [
  {
    text: "Dashboard",
    icon: <Dashboard fontSize="small" />,
    path: "/dashboard",
  },
  {
    text: "Students",
    icon: <School fontSize="small" />,
    path: "/students",
  },
  {
    text: "Teachers",
    icon: <People fontSize="small" />,
    path: "/teachers",
  },
  {
    text: "Classes",
    icon: <Class fontSize="small" />,
    path: "/classes",
  },
  {
    text: "Fees",
    icon: <Payments fontSize="small" />,
    path: "/fees",
  },
  {
    text: "Attendance",
    icon: <EventAvailable fontSize="small" />,
    path: "/attendance",
  },
  {
    text: "Exams",
    icon: <Quiz fontSize="small" />,
    path: "/exams",
  },
  {
    text: "Library",
    icon: <MenuBook fontSize="small" />,
    path: "/library",
  },
  {
    text: "Settings",
    icon: <Settings fontSize="small" />,
    path: "/settings",
  },
];

function DrawerContent({ onClose }: { onClose: () => void }) {
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

      <Box
        sx={{
          py: 1,
        }}
      >
        <List>
          {menus.map((menu) => (
            <ListItemButton
              key={menu.text}
              component={NavLink}
              to={menu.path}
              onClick={onClose}
              sx={{
                mx: 1.5,
                my: 0.5,
                borderRadius: 2,
                minHeight: 46,

                "&.active": {
                  bgcolor: "primary.main",
                  color: "#fff",

                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },

                "&:hover": {
                  bgcolor: "#EAF3FF",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: "text.secondary",
                }}
              >
                {menu.icon}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {menu.text}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
}

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  return (
    <Box
      component="nav"
      sx={{
        width: {
          lg: drawerWidth,
        },
        flexShrink: {
          lg: 0,
        },
      }}
    >
      {/* Mobile Drawer */}
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
            lg: "none",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #ECECEC",
          },
        }}
      >
        <DrawerContent onClose={onClose} />
      </Drawer>

      {/* Desktop Drawer */}
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
            boxSizing: "border-box",
            borderRight: "1px solid #ECECEC",
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <DrawerContent onClose={() => { }} />
      </Drawer>
    </Box>
  );
}