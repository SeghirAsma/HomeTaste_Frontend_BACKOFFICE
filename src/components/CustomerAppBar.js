import React from "react";
import {
  AppBar, Toolbar, Typography, Box, IconButton, Badge, Menu, MenuItem
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import InputBase from "@mui/material/InputBase";

// --- Search Styling ---
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2), height: '100%',
  position: 'absolute', pointerEvents: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '20ch' },
  },
}));




export default function CustomAppBar({
  menuId,
  mobileMenuId,
  anchorEl,
  mobileMoreAnchorEl,
  handleProfileMenuOpen,
  handleMobileMenuOpen,
  handleMenuClose,
  handleMobileMenuClose,
}) {
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "linear-gradient(90deg, #4A148C 0%, #6A1B9A 100%)",
        color: "white",
        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ display: { xs: "none", sm: "block" } }}>
          Home Taste
        </Typography>

        <Search>
          <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop Icons */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error"><MailIcon /></Badge>
          </IconButton>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="error"><NotificationsIcon /></Badge>
          </IconButton>
          <IconButton size="large" edge="end" onClick={handleProfileMenuOpen} color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Menus */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        id={menuId}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>

      <Menu
        anchorEl={mobileMoreAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        id={mobileMenuId}
      >
        <MenuItem>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error"><MailIcon /></Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="error"><NotificationsIcon /></Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton size="large" edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
