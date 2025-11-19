import React, { useState } from "react";
import {
  Drawer, Toolbar, Divider, List, ListItemButton,
  ListItemIcon, ListItemText
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
const drawerWidth = 240;

export default function CustomDrawer({ open }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "Dashboard", label: "Dashboard", icon: <InboxIcon /> , path: "/",},
    { id: "SentMail", label: "Sent Mail", icon: <MailIcon /> },
    { id: "Drafts", label: "Drafts", icon: <DraftsIcon /> },
    { id: "Profile", label: "Profile", icon: <AccountCircle />, path: "/Profile" },
    { id: "Logout", label: "LogOUT", icon: <LogoutIcon /> },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(90deg, #4A148C 0%, #6A1B9A 100%)",
          color: "white",
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Toolbar />
      <Divider />

      <List>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <React.Fragment key={item.path}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor: isSelected ? "rgba(255,255,255,0.15)" : "transparent",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                }}
              >
                <ListItemIcon sx={{ color: "#fcfafdff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
              <Divider 
                sx={{
                  width: "100%",
                  my: 0.5,
                  border: "none",
                  height: "1.5px",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  backgroundColor: isSelected ? "white" : "rgba(74, 20, 140, 0.9)",
                }}
              />
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
}

export const drawerWidthValue = drawerWidth;
