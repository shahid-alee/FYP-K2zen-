import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LOGO from "../../../assets/logo/k2zenLogo.png";
import "./navBar.scss";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [logoutMenu, setLogoutMenu] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Listen for login/signup/logout change
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
    setLogoutMenu(null);
    navigate("/");
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" className="navbar" elevation={0}>
      <Toolbar className="toolbar">
        {/* Logo */}
        <Box className="navbar-logo" onClick={() => navigate("/")}>
          <img src={LOGO} alt="Logo" className="navbar-logo-img" />
          <Typography variant="h6" className="navbar-title">
            K2Zen Adventures
          </Typography>
        </Box>

        {/* Navigation Links */}
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
                <Link to="/customizePackage" className="dropdown-item">
                  Customize Your Package
                </Link>
                <Link to="/PackageByBudget" className="dropdown-item">
                  Package By Budget
                </Link>
              </Box>
            )}
          </Box>

          <Link to="/gallery" className="navbar-link">Gallery</Link>
          <Link to="/rentCar" className="navbar-link">Rent a Car</Link>
          <Link to="/hotels" className="navbar-link">Hotels</Link>
          <Link to="/aboutUs" className="navbar-link">About Us</Link>
          <Link to="/contactUs" className="navbar-link">Contact</Link>
        </Box>

        {/* Actions */}
        <Box className="navbar-actions">
          {/* <Link to="/enquire">
            <button className="enquire-btn">Enquire Now</button>
          </Link> */}

          {/* ✅ Show tick & username when logged in */}
          {user ? (
            <>
              <Box
                className="user-info"
                onClick={(e) => setLogoutMenu(e.currentTarget)}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <CheckCircleIcon className="tick-icon" color="success" />
                <Typography className="username" sx={{ color: "#fff" }}>
                  {user.username}
                </Typography>
              </Box>

              <Menu
                anchorEl={logoutMenu}
                open={Boolean(logoutMenu)}
                onClose={() => setLogoutMenu(null)}
              >
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/register" className="signup-icon">
              <IconButton color="inherit">
                <PersonAddAltIcon />
              </IconButton>
            </Link>
          )}

          {/* Mobile Menu Icon */}
          <IconButton
            className="mobile-menu-icon"
            onClick={handleMenuOpen}
            size="large"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className="mobile-menu"
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/" className="mobile-link">Home</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/destination" className="mobile-link">Destination</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/gallery" className="mobile-link">Gallery</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/aboutUs" className="mobile-link">About Us</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
