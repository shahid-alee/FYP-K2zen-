import { useState } from "react";
import LOGO from "../../../assets/logo/k2zenLogo.png";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom"; 
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"; // Signup Icon
import "./navBar.scss";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <AppBar position="fixed" className="navbar" elevation={0}>
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
             className="container"
          >
            {/* Logo and Title */}
            <Grid item className="navbar-logo">
              <img src={LOGO} alt="Logo" className="navbar-logo-img" />
              <Typography variant="h6" className="navbar-title">
                K2Zen Adventures
              </Typography>
            </Grid>

            {/* Menu */}
            <Grid item className="navbar-right">
              <ul className="navbar-menu">
                <li>
                  <Link to="/" className="navbar-link">Home</Link>
                </li>

                <li
                  className="dropdown-wrapper"
                  onMouseEnter={() => setOpenMenu("destination")}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <span className="navbar-link">Destination ▾</span>
                  {openMenu === "destination" && (
                    <Box className="dropdown-menu">
                      <Link to="../destination/skarduPackages" className="dropdown-item">Skardu</Link>
                      <Link to="/destination/hunzaPackages" className="dropdown-item">Hunza</Link>
                    </Box>
                  )}
                </li>

                <li><Link to="/gallery" className="navbar-link">Gallery</Link></li>
                <li><Link to="/rentCar" className="navbar-link">Rent a Car</Link></li>
                <li><Link to="/hotels" className="navbar-link">Hotels</Link></li>
                <li><Link to="/aboutUs" className="navbar-link">About Us</Link></li>
                <li><Link to="/contactUs" className="navbar-link">Contact</Link></li>

                {/* Enquire Now Button */}
                <li>
                  <Link to="/enquire" ><button className="enquire-btn">Enquire Now</button></Link>
                </li>
              </ul>
            </Grid>

            {/* Signup Icon at Far Right */}
            <Grid item className="signup-wrapper">
              <Link to="/register" className="signup-icon">
                <IconButton>
                  <PersonAddAltIcon />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
