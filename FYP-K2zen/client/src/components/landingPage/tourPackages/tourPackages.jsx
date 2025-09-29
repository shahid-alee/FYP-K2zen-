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

import skardu1 from "../../../assets/heroSection/bg.jpeg";
import skardu2 from "../../../assets/heroSection/bg2.jpeg";
import skardu3 from "../../../assets/heroSection/bg3.jpeg";
import hunza1 from "../../../assets/heroSection/bg.jpeg";
import hunza2 from "../../../assets/heroSection/bg2.jpeg";
import honeymoon1 from "../../../assets/heroSection/bg3.jpeg";
import honeymoon2 from "../../../assets/heroSection/bg2.jpeg";
import honeymoon3 from "../../../assets/heroSection/bg3.jpeg";
import honeymoon4 from "../../../assets/heroSection/bg.jpeg";

export const packages = [
  {
    id: 1,
    title: "3 Days Skardu Adventure",
    places: ["Deosai", "Upper Kachura"],
    days: 3,
    image: skardu1,
    description:
      "Explore Skardu’s breathtaking landscapes including Deosai Plains and Upper Kachura Lake. Perfect short trip for adventure lovers.",
  },
  {
    id: 2,
    title: "5 Days Skardu Tour",
    places: ["Shangrila", "Shigar Fort", "Khaplu"],
    days: 5,
    image: skardu2,
    description:
      "Experience the beauty of Skardu with historic forts, Shangrila resort, and the majestic Khaplu valley.",
  },
  {
    id: 3,
    title: "7 Days Skardu & Hunza",
    places: ["Deosai", "Attabad", "Baltit", "Khunjerab"],
    days: 7,
    image: skardu3,
    description:
      "A complete package to explore both Skardu & Hunza valleys with their lakes, forts, and Khunjerab Pass.",
  },
  {
    id: 4,
    title: "3 Days Hunza Escape",
    places: ["Eagle’s Nest", "Altit Fort", "Attabad"],
    days: 3,
    image: hunza1,
    description:
      "A quick getaway to Hunza’s scenic Eagle’s Nest viewpoint, Attabad Lake, and the historic Altit Fort.",
  },
  {
    id: 5,
    title: "5 Days Hunza & Khunjerab",
    places: ["Passu Cones", "Attabad", "Khunjerab"],
    days: 5,
    image: hunza2,
    description:
      "Discover Hunza valley’s Passu Cones, beautiful Attabad Lake, and journey to the Khunjerab border.",
  },
  {
    id: 6,
    title: "7 Days Skardu Honeymoon",
    places: ["Deosai", "Blind Lake", "Upper Kachura"],
    days: 7,
    image: honeymoon1,
    description:
      "Romantic honeymoon in Skardu with lake views, cozy nights, and adventures in Deosai.",
  },
  {
    id: 7,
    title: "Honeymoon Special",
    places: ["Candlelight Dinner", "Decorated Room"],
    days: 4,
    image: honeymoon2,
    description:
      "Romantic honeymoon package with decorated rooms and candlelight dinner in the heart of nature.",
  },
  {
    id: 8,
    title: "Romantic Hunza Escape",
    places: ["Attabad", "Altit", "Couple Setup"],
    days: 5,
    image: honeymoon3,
    description:
      "A couple’s favorite: romantic setup at Attabad Lake, historic Altit Fort, and scenic spots in Hunza.",
  },
  {
    id: 9,
    title: "Deosai Bliss Honeymoon",
    places: ["Deosai Night Sky", "Luxury Camp", "Couple Bonfire"],
    days: 4,
    image: honeymoon4,
    description:
      "Romantic nights under Deosai’s starlit sky with bonfire and luxury camping.",
  },
];

export default function PopularPackages() {
  const navigate = useNavigate();

  return (
    <Box className="packages-section">
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
                  onClick={() => navigate(`/packageDetail/${pkg.id}`, { state: pkg })}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="section-header">
      <Typography variant="h4" className="section-title honeymoon">
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
                  onClick={() => navigate(`/packageDetail/${pkg.id}`, { state: pkg })}
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
