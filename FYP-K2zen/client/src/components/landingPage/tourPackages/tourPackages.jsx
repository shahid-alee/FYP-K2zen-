import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./tourPackages.scss";

import skarduImg from "../../../assets/heroSection/bg.jpeg";
import hunzaImg from "../../../assets/heroSection/bg2.jpeg";
import gilgitImg from "../../../assets/heroSection/bg3.jpeg";
import ghancheImg from "../../../assets/heroSection/bg2.jpeg";
import deosaiImg from "../../../assets/heroSection/bg3.jpeg";
import diamerImg from "../../../assets/heroSection/bg.jpeg";
import honeymoon1 from "../../../assets/heroSection/bg3.jpeg";
import honeymoon2 from "../../../assets/heroSection/bg2.jpeg";
import honeymoon3 from "../../../assets/heroSection/bg3.jpeg";

export const packages = [
  // ====== Popular Packages ======
  {
    id: 1,
    title: "3 Days Skardu Adventure",
    places: ["Upper Kachura", "Shangrila Resort"],
    days: 3,
    image: skarduImg,
  },
  {
    id: 2,
    title: "5 Days Hunza & Khunjerab",
    places: ["Attabad Lake", "Altit Fort", "Khunjerab Pass"],
    days: 5,
    image: hunzaImg,
  },
  {
    id: 3,
    title: "7 Days Gilgit–Deosai Expedition",
    places: ["Deosai Plains", "Naltar Valley", "Satrangi Lake"],
    days: 7,
    image: gilgitImg,
  },
  {
    id: 4,
    title: "3 Days Ghanche Discovery",
    places: ["Khaplu Fort", "Chaqchan Mosque", "Saling Valley"],
    days: 3,
    image: ghancheImg,
  },
  {
    id: 5,
    title: "5 Days Diamer & Fairy Meadows",
    places: ["Chilas", "Babusar Pass", "Fairy Meadows"],
    days: 5,
    image: diamerImg,
  },
  {
    id: 6,
    title: "7 Days Deosai & Skardu Explorer",
    places: ["Deosai Plains", "Blind Lake", "Shigar Fort"],
    days: 7,
    image: deosaiImg,
  },

  // ====== Honeymoon Packages ======
  {
    id: 7,
    title: "3 Days Romantic Skardu Escape",
    places: ["Upper Kachura", "Blind Lake"],
    days: 3,
    image: honeymoon1,
  },
  {
    id: 8,
    title: "5 Days Hunza Bliss Honeymoon",
    places: ["Attabad Lake", "Altit Fort", "Eagle’s Nest"],
    days: 5,
    image: honeymoon2,
  },
  {
    id: 9,
    title: "7 Days Skardu–Deosai Romance",
    places: ["Deosai Night Sky", "Shangrila Resort", "Couple Bonfire"],
    days: 7,
    image: honeymoon3,
  },
];

export default function PopularPackages() {
  const navigate = useNavigate();

  return (
    <Box className="packages-section">
      {/* ===== Popular Section ===== */}
      <div className="section-header">
        <Typography variant="h3" className="section-title">
          Popular Tour Packages
        </Typography>
      </div>

      <Grid container spacing={3} justifyContent="center">
        {packages.slice(0, 6).map((pkg) => (
          <Grid item xs={12} sm={6} md={5} key={pkg.id}>
            <Card className="package-card">
              <div className="package-image">
                <img src={pkg.image} alt={pkg.title} />
              </div>
              <CardContent className="package-content">
                <Typography variant="h6" className="package-title">
                  {pkg.title}
                </Typography>
                <ul className="package-list">
                  {pkg.places.map((place, i) => (
                    <li key={i}>{place}</li>
                  ))}
                </ul>
                <Typography className="package-days">{pkg.days} Days</Typography>
                <Button
                  className="package-btn"
                  onClick={() =>
                    navigate(`/packageDetail/${pkg.id}`, { state: pkg })
                  }
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ===== Honeymoon Section ===== */}
      <div className="section-header">
        <Typography variant="h4" className="section-title-honeymoon">
          Honeymoon Packages
        </Typography>
      </div>

      <Grid container spacing={3} justifyContent="center">
        {packages.slice(6).map((pkg) => (
          <Grid item xs={12} sm={6} md={5} key={pkg.id}>
            <Card className="package-card honeymoon-card">
              <div className="package-image">
                <img src={pkg.image} alt={pkg.title} />
              </div>
              <CardContent className="package-content">
                <Typography variant="h6" className="package-title">
                  {pkg.title}
                </Typography>
                <ul className="package-list">
                  {pkg.places.map((place, i) => (
                    <li key={i}>{place}</li>
                  ))}
                </ul>
                <Typography className="package-days">{pkg.days} Days</Typography>
                <Button
                  className="package-btn honeymoon-btn"
                  onClick={() =>
                    navigate(`/packageDetail/${pkg.id}`, { state: pkg })
                  }
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
