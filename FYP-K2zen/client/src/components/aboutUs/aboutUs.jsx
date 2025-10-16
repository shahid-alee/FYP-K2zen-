import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import aboutMain from "../../assets/heroSection/bg2.jpg";
import aboutSide1 from "../../assets/heroSection/bg1.jpg";
import aboutSide2 from "../../assets/heroSection/bgimg.jpg";
import aboutSide3 from "../../assets/heroSection/bg2.jpg";
import "./aboutUs.scss";

export default function AboutUs() {
  return (
    <Box className="about-section">
      <Grid container spacing={6} alignItems="center">
        {/* Left Content */}
        <Grid item xs={12} md={6} className="about-text-section">
          <Typography variant="h3" className="about-title">
            Welcome to <span>K2Zen Adventures</span>
          </Typography>

          <Typography variant="h6" className="about-subtitle">
            Your Gateway to Authentic Tourism in Gilgit-Baltistan
          </Typography>

          <Typography className="about-text">
            Founded in <strong>2024</strong>, <strong>K2Zen Adventures</strong> is your trusted
            travel companion across the majestic landscapes of Gilgit-Baltistan.
            Our mission is to create immersive, safe, and personalized travel
            experiences that blend nature, culture, and adventure.
          </Typography>

          <Typography className="about-text">
            We specialize in curated tour packages, comfortable transport,
            cultural explorations, and seamless bookings — empowering you to
            explore the northern beauty like never before.
          </Typography>

          <Button variant="contained" className="about-btn">
            Discover Our Story
          </Button>
        </Grid>

        {/* Right Image Collage */}
        <Grid item xs={12} md={6} className="about-image-section">
          <Box className="image-grid">
            <Box className="main-image">
              <img src={aboutMain} alt="K2Zen Adventure Main" />
            </Box>

            <Box className="side-images">
              <img src={aboutSide1} alt="Adventure 1" />
              <img src={aboutSide2} alt="Adventure 2" />
              <img src={aboutSide3} alt="Adventure 3" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
