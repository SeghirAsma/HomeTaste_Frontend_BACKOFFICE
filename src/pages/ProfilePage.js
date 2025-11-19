import React, { useState } from "react";
import { Box,Toolbar, Typography, IconButton, Avatar, Grid, Card, CardContent, Button, Divider, }
 from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from "@mui/icons-material/VpnKey";
import InventoryIcon from "@mui/icons-material/Inventory";
import CustomerAppBar from "../components/CustomerAppBar";
import CustomerDrawer from "../components/CustomerDrawer";

const drawerWidth = 240;

export default function UserProfile() {

  // AppBar menu handling
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const mockUser = {
    fullName: "John Anderson",
    email: "john.anderson@example.com",
    phone: "+1 (555) 123-4567",
    username: "john.inventory",
    role: "Inventory Manager",
    createdAt: "2023-01-15",
    lastLogin: "2024-01-20",
    totalItems: 1234,
    recentInteractions: [
      { id: 1, action: "Updated Stock", item: "Laptop Dell XPS", date: "2024-01-19" },
      { id: 2, action: "Approved Shipment", item: "Office Supplies", date: "2024-01-18" },
    ],
    assignedEquipment: [
      { id: 1, name: "Company Laptop", status: "Active" },
      { id: 2, name: "Access Card", status: "Active" },
    ],
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CustomerAppBar
        menuId={menuId}
        mobileMenuId={mobileMenuId}
        anchorEl={anchorEl}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMobileMenuOpen={handleMobileMenuOpen}
        handleMenuClose={handleMenuClose}
        handleMobileMenuClose={handleMobileMenuClose}
      />

      <CustomerDrawer open={drawerOpen} />

      <Box component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />

        <Box sx={{ maxWidth: 1300, mx: "auto", p: 3 }}>
            <Grid container spacing={3}>

              {/* LEFT CARD */}
              <Grid  xs={12} md={4}>
                <Card sx={{ p: 2 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Avatar
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                      sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
                    />
                    <IconButton
                      sx={{
                        position: "relative",
                        top: -50,
                        left: 40,
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": { opacity: 0.8 },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <Typography variant="h6">{mockUser.fullName}</Typography>
                    <Typography color="text.secondary">{mockUser.role}</Typography>

                    <Box sx={{ textAlign: "left", mt: 4 }}>
                      <Typography variant="subtitle2">Email</Typography>
                      <Typography>{mockUser.email}</Typography>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle2">Phone</Typography>
                      <Typography>{mockUser.phone}</Typography>
                    </Box>
                  </CardContent>

                  {/* ACTION BUTTONS */}
                  <Box sx={{ p: 2, display: "grid", gap: 2 }}>
                    <Button variant="contained" startIcon={<EditIcon />}>
                      Edit Profile
                    </Button>

                    <Button variant="contained" color="secondary" startIcon={<KeyIcon />}>
                      Change Password
                    </Button>

                    <Button variant="contained" color="error" startIcon={<LogoutIcon />}>
                      Logout
                    </Button>
                  </Box>
                </Card>
              </Grid>

              {/* RIGHT SIDE */}
              <Grid  xs={12} md={8}>
                {/* Account Details */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6">Account Details</Typography>
                    <Divider sx={{ my: 1 }} />

                    <Grid container spacing={2}>
                      <Grid  xs={6}>
                        <Typography variant="subtitle2">Username</Typography>
                        <Typography>{mockUser.username}</Typography>
                      </Grid>

                      <Grid  xs={6}>
                        <Typography variant="subtitle2">Account Created</Typography>
                        <Typography>{mockUser.createdAt}</Typography>
                      </Grid>

                      <Grid  xs={6}>
                        <Typography variant="subtitle2">Last Login</Typography>
                        <Typography>{mockUser.lastLogin}</Typography>
                      </Grid>

                      <Grid  xs={6}>
                        <Typography variant="subtitle2">Total Items Managed</Typography>
                        <Typography>{mockUser.totalItems}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Recent Interactions */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6">Recent Inventory Interactions</Typography>
                    <Divider sx={{ my: 1 }} />

                    {mockUser.recentInteractions.map((i) => (
                      <Box key={i.id} sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 2, mb: 2 }}>
                        <Typography fontWeight="bold">{i.action}</Typography>
                        <Typography color="text.secondary">{i.item}</Typography>
                        <Typography variant="caption">{i.date}</Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>

                {/* Equipment */}
                <Card>
                  <CardContent>
                    <Typography variant="h6">Assigned Equipment</Typography>
                    <Divider sx={{ my: 1 }} />

                    <Grid container spacing={2}>
                      {mockUser.assignedEquipment.map((eq) => (
                        <Grid  xs={12} sm={6} key={eq.id}>
                          <Box
                            sx={{
                              p: 2,
                              bgcolor: "#f9f9f9",
                              borderRadius: 2,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <InventoryIcon color="primary" />
                              <Typography>{eq.name}</Typography>
                            </Box>
                            <Typography
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: "green.100",
                                color: "green.800",
                              }}
                            >
                              {eq.status}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

         
        </Box>
      </Box>
    </Box>
  );
}
