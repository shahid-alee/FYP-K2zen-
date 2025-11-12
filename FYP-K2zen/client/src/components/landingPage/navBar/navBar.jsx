import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LOGO from "../../../assets/logo/k2zenLogo.png";
import "./navBar.scss";

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenu, setProfileMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleUserChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("userChanged", handleUserChange);
    window.addEventListener("storage", handleUserChange);
    return () => {
      window.removeEventListener("userChanged", handleUserChange);
      window.removeEventListener("storage", handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    setProfileMenu(null);
    setDrawerOpen(false);
    navigate("/");
  };

  return (
    <AppBar position="fixed" className="navbar" elevation={0}>
      <Toolbar className="toolbar">

        {/* ✅ Logo */}
        <Box className="navbar-logo" onClick={() => navigate("/")}>
          <img src={LOGO} alt="Logo" className="navbar-logo-img" />
          <Typography variant="h6" className="navbar-title">
            K2Zen Adventures
          </Typography>
        </Box>

        {/* ✅ Desktop Menu */}
        <Box className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/destination" className="navbar-link">Destination</Link>

          <Box
            className="dropdown-wrapper"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="navbar-link">Customize</span>
            {dropdownOpen && (
              <Box className="dropdown-menu">
                <Link to="/customizePackage" className="dropdown-item">Customize Your Package</Link>
                <Link to="/PackageByBudget" className="dropdown-item">Package By Budget</Link>
              </Box>
            )}
          </Box>

          <Link to="/gallery" className="navbar-link">Gallery</Link>
          <Link to="/rentCar" className="navbar-link">Rent a Car</Link>
          <Link to="/hotels" className="navbar-link">Hotels</Link>
          <Link to="/aboutUs" className="navbar-link">About Us</Link>
          <Link to="/contactUs" className="navbar-link">Contact</Link>
        </Box>

        {/* ✅ Login / Profile + Mobile Menu Icon */}
        <Box className="navbar-actions">
          {!user ? (
            <Link to="/register" className="signup-icon">
              <IconButton>
                <PersonAddAltIcon />
              </IconButton>
            </Link>
          ) : (
            <>
              <IconButton onClick={(e) => setProfileMenu(e.currentTarget)}>
                <AccountCircleIcon sx={{ fontSize: 32, color: "#239753" }} />
              </IconButton>

              <Menu
                anchorEl={profileMenu}
                open={Boolean(profileMenu)}
                onClose={() => setProfileMenu(null)}
              >
                <MenuItem>
                  <AccountCircleIcon sx={{ mr: 1 }} /> {user.username}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          )}

          {/* ✅ Mobile Menu Icon */}
          <IconButton className="mobile-menu-icon" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* ✅ Mobile Drawer Full-Width */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: { width: "80%", background: "#fff" } // Full-width mobile style
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: "700", color: "#239753", mb: 2 }}>
              Menu
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <List>

              <ListItem disablePadding>
                <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} to="/">
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} to="/destination">
                  <ListItemText primary="Destination" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} to="/customizePackage">
                  <ListItemText primary="Customize" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} to="/gallery">
                  <ListItemText primary="Gallery" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} to="/aboutUs">
                  <ListItemText primary="About Us" />
                </ListItemButton>
              </ListItem>

              {user && (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              )}

            </List>
          </Box>
        </Drawer>

      </Toolbar>
    </AppBar>
  );
}
