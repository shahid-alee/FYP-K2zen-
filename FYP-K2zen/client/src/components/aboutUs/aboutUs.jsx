import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import aboutImage from "../../assets/heroSection/bg2.jpg"; 
import "./aboutUs.scss";

export default function AboutUs() {
  return (
    <Box className="about-section">
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6} className="about-text-section">
          <Typography variant="h3" className="about-title">
            Welcome to <span>K2Zen Adventures</span>
          </Typography>

          <Typography variant="h6" className="about-subtitle">
            Your Gateway to Authentic Tourism in Gilgit-Baltistan
          </Typography>

          <Typography className="about-text">
            Founded in <strong>2024</strong>, K2Zen Adventures is committed to
            transforming tourism in Gilgit-Baltistan. As a local operator, we
            blend tradition with modern technology to offer safe, immersive, and
            unforgettable travel experiences.
          </Typography>

          <Typography className="about-text">
            From curated tour packages to trusted transport and cultural
            encounters, our responsive platforms make exploration seamless and
            reliable.
          </Typography>

          <Button variant="contained" className="about-btn">
            Discover Our Story
          </Button>
        </Grid>

        <Grid item xs={12} md={6} className="about-image-section">
          <Box
            component="img"
            src={aboutImage}
            alt="About K2Zen Adventures"
            className="about-image"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
