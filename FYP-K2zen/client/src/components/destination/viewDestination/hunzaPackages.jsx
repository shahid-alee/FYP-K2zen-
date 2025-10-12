import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./scssSheet.scss";

import day3Img from "../../../assets/heroSection/bg1.jpg";
import day5Img from "../../../assets/heroSection/bg2.jpg";
import day7Img from "../../../assets/heroSection/bg1.jpg";

const hunzaPackages = [
  {
    days: 3,
    title: "3 Days Hunza Cultural Getaway",
    places: ["Baltit Fort", "Altit Fort", "Karimabad Valley"],
    description:
      "A quick escape to explore Hunza’s rich history and culture — from the ancient forts of Baltit and Altit to the charming beauty of Karimabad Valley.",
    image: day3Img,
  },
  {
    days: 5,
    title: "5 Days Hunza Adventure Tour",
    places: [
      "Attabad Lake",
      "Karimabad Valley",
      "Baltit Fort",
      "Altit Fort",
      "Aliabad Hunza",
    ],
    description:
      "Experience the magic of Hunza over 5 days — cruise on the turquoise Attabad Lake, explore historic forts, and enjoy the vibrant atmosphere of Aliabad.",
    image: day5Img,
  },
  {
    days: 7,
    title: "7 Days Explore Hunza & Beyond",
    places: [
      "Khunjerab Pass",
      "Shimshal Lake",
      "Attabad Lake",
      "Karimabad Valley",
      "Baltit Fort",
      "Altit Fort",
      "Aliabad Hunza",
    ],
    description:
      "A complete Hunza adventure — from the snowy peaks of Khunjerab Pass to the crystal waters of Shimshal and Attabad Lakes, and the timeless beauty of Hunza’s heritage.",
    image: day7Img,
  },
];

export default function HunzaPackages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography
        sx={{ marginTop: "6%", marginBottom: "4%" }}
        className="pack-title"
      >
        Hunza Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {hunzaPackages.map((pkg, idx) => (
          <Grid item xs={12} key={idx}>
            <Card className="tour-card">
              {/* 👈 Image on Right Side */}
              <CardMedia
                component="img"
                image={pkg.image}
                alt={pkg.title}
                className="card-media"
              />

              {/* 👉 Content on Left Side */}
              <CardContent className="card-details">
                <Typography variant="h6" className="card-title">
                  {pkg.title}
                </Typography>

                <Typography variant="subtitle2" className="duration">
                  Duration: {pkg.days} Days
                </Typography>

                <Typography variant="body2" className="card-description">
                  {pkg.description}
                </Typography>

                <ul className="place-list">
                  {pkg.places.map((place, i) => (
                    <li key={i}>{place}</li>
                  ))}
                </ul>

                <Button
                  variant="contained"
                  className="tour-btn"
                  onClick={() => handleBookNow(pkg)}
                >
                  View Package
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
