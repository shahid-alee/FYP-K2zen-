import React from "react";
import { Button, Typography, Container, IconButton } from "@mui/material";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import HERO1 from "../../../assets/heroSection/bgimg.jpg";
import HERO2 from "../../../assets/heroSection/bg1.jpg";
import HERO3 from "../../../assets/heroSection/bg2.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./heroSection.scss";

const HeroSection = () => {
  // Custom Arrow Components
  const NextArrow = ({ onClick }) => (
    <IconButton className="hero-arrow next" onClick={onClick}>
      <ArrowForwardIos />
    </IconButton>
  );

  const PrevArrow = ({ onClick }) => (
    <IconButton className="hero-arrow prev" onClick={onClick}>
      <ArrowBackIos />
    </IconButton>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: true, // ✅ enable arrows
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const heroImages = [HERO1, HERO2, HERO3];

  return (
    <section className="hero-section">
      {/* Background Slider */}
      <Slider {...sliderSettings} className="hero-bg-slider">
        {heroImages.map((img, index) => (
          <div key={index} className="hero-slide">
            <img src={img} alt={`Slide ${index}`} className="hero-bg-img" />
          </div>
        ))}
      </Slider>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <Container className="hero-content">
        <Typography variant="h2" className="hero-title">
          Welcome to <span>K2Zen Adventures</span>
        </Typography>
        <Typography variant="body1" className="hero-subtitle">
          Discover breathtaking mountains, crystal-clear lakes, and cultural
          heritage. Let us make your journey unforgettable.
        </Typography>

        <div className="hero-buttons">
          <Button className="hero-btn">Book a Tour</Button>
          <Button className="hero-btn-outline">Learn More</Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
