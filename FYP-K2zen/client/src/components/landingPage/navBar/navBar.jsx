import { useState } from "react";
import LOGO from "../../../assets/logo/k2zenLogo.png";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom"; 
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
          >
            <Grid item className="navbar-logo">
              <img src={LOGO} alt="Logo" className="navbar-logo-img" />
              <Typography variant="h6" className="navbar-title">
                K2Zen Adventures
              </Typography>
            </Grid>

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

                {/* <li
                  className="dropdown-wrapper"
                  onMouseEnter={() => setOpenMenu("tour")}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <span className="navbar-link">Tour Types ▾</span>
                  {openMenu === "tour" && (
                    <Box className="dropdown-menu">
                      <Link to="/tours/one-day" className="dropdown-item">One Day</Link>
                      <Link to="/tours/three-days" className="dropdown-item">Three Days</Link>
                      <Link to="/tours/five-days" className="dropdown-item">Five Days</Link>
                      <Link to="/tours/seven-days" className="dropdown-item">Seven Days</Link>
                    </Box>
                  )}
                </li> */}

                <li>
                  <Link to="/gallery" className="navbar-link">Gallery</Link>
                </li>

                <li><Link to="/rentCar" className="navbar-link">Rent a Car</Link></li>
                <li><Link to="/hotels" className="navbar-link">Hotels</Link></li>
                <li><Link to="/aboutUs" className="navbar-link">About Us</Link></li>
                <li><Link to="/contactUs" className="navbar-link">Contact</Link></li>

                <li>
                  <Link to="/enquire" className="enquire-btn">Enquire Now</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
