import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LOGO from "../../../assets/logo/k2zenLogo.png";
import "./navBar.scss";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" className="navbar" elevation={0}>
      <Toolbar className="toolbar">
        {/* Left - Logo */}
        <Box className="navbar-logo">
          <img src={LOGO} alt="Logo" className="navbar-logo-img" />
          <Typography variant="h6" className="navbar-title">
            K2Zen Adventures
          </Typography>
        </Box>

        {/* Center - Menu Links (Hide under 1000px) */}
        <Box className="navbar-menu">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/destination" className="navbar-link">
            Destination
          </Link>

          {/* Dropdown for Customize */}
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

          <Link to="/gallery" className="navbar-link">
            Gallery
          </Link>
          <Link to="/rentCar" className="navbar-link">
            Rent a Car
          </Link>
          <Link to="/hotels" className="navbar-link">
            Hotels
          </Link>
          <Link to="/aboutUs" className="navbar-link">
            About Us
          </Link>
          <Link to="/contactUs" className="navbar-link">
            Contact
          </Link>
        </Box>

        {/* Right - Enquire + Register + Mobile Menu */}
        <Box className="navbar-actions">
          <Link to="/enquire">
            <button className="enquire-btn">Enquire Now</button>
          </Link>
          <Link to="/register" className="signup-icon">
            <IconButton>
              <PersonAddAltIcon />
            </IconButton>
          </Link>

          {/* Mobile Menu Icon */}
          <IconButton
            className="mobile-menu-icon"
            onClick={handleMenuOpen}
            size="large"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className="mobile-menu"
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/destination">Destination</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/gallery">Gallery</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/rentCar">Rent a Car</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/hotels">Hotels</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/aboutUs">About Us</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/contactUs">Contact</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
