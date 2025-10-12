import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./scssSheet.scss";

import gilgit1 from "../../../assets/heroSection/bg1.jpg";
import gilgit2 from "../../../assets/heroSection/bg2.jpg";
import gilgit3 from "../../../assets/heroSection/bg1.jpg";

const gilgitPackages = [
  {
    days: 3,
    title: "3 Days Gilgit Getaway",
    places: ["Satrangi Lake", "Naltar Valley", "Firoza Lake"],
    description:
      "A short yet fulfilling trip to explore Gilgit’s colorful lakes and the serene Naltar Valley — perfect for nature lovers.",
    image: gilgit1,
  },
  {
    days: 5,
    title: "5 Days Gilgit Adventure",
    places: ["Bireno Suspension Bridge", "Kutwal Lake", "Naltar Valley", "Kargah Buddha"],
    description:
      "A 5-day adventure across Gilgit’s cultural and natural landmarks — from ancient Buddhist carvings to stunning alpine lakes.",
    image: gilgit2,
  },
  {
    days: 7,
    title: "7 Days Gilgit Exploration",
    places: ["Satrangi Lake", "Firoza Lake", "Kutwal Lake", "Kargah Buddha", "Naltar Valley", "Bireno Suspension Bridge"],
    description:
      "Immerse yourself in Gilgit’s full charm — discover valleys, lakes, and historical sites in this week-long exploration.",
    image: gilgit3,
  },
];

export default function GilgitPackages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography sx={{ marginTop: "6%", marginBottom: "4%" }} className="pack-title">
        Gilgit Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {gilgitPackages.map((pkg, idx) => (
          <Grid item xs={12} key={idx}>
            <Card className="tour-card">
              {/* Image on the Right */}
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
