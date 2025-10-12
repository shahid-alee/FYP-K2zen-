import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./scssSheet.scss";

import ghizer1 from "../../../assets/heroSection/bg1.jpg";
import ghizer2 from "../../../assets/heroSection/bg2.jpg";
import ghizer3 from "../../../assets/heroSection/bg1.jpg";

const ghizerPackages = [
  {
    days: 3,
    title: "3 Days Ghizer Escape",
    places: ["Phandar Valley", "Khalti Lake", "Burst Valley"],
    description:
      "A short yet refreshing getaway to explore Ghizer’s famous lakes and valleys — perfect for nature enthusiasts.",
    image: ghizer1,
  },
  {
    days: 5,
    title: "5 Days Ghizer Adventure",
    places: ["Shandur Pass", "Yasin Valley", "Khalti Lake", "Phandar Valley"],
    description:
      "A 5-day journey through Ghizer’s stunning landscapes — experience the beauty of Shandur, Yasin, and Phandar Valleys.",
    image: ghizer2,
  },
  {
    days: 7,
    title: "7 Days Ghizer Expedition",
    places: ["Karumber Lake", "Chatorkhand", "Yasin Valley", "Shandur Pass", "Phandar Valley", "Burst Valley"],
    description:
      "A complete 7-day exploration of Ghizer — uncover hidden gems, pristine lakes, and scenic mountain valleys.",
    image: ghizer3,
  },
];

export default function GhizerPackages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography sx={{ marginTop: "6%", marginBottom: "4%" }} className="pack-title">
        Ghizer Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {ghizerPackages.map((pkg, idx) => (
          <Grid item xs={12} key={idx}>
            <Card className="tour-card">
              {/* Content Left */}
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
                  Book Now
                </Button>
              </CardContent>

              {/* Image Right */}
              <CardMedia
                component="img"
                image={pkg.image}
                alt={pkg.title}
                className="card-media"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
