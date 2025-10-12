import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./scssSheet.scss";

import ghanche1 from "../../../assets/heroSection/bg1.jpg";
import ghanche2 from "../../../assets/heroSection/bg2.jpg";
import ghanche3 from "../../../assets/heroSection/bg1.jpg";

const ghanchePackages = [
  {
    days: 3,
    title: "3 Days Ghanche Highlights",
    places: ["Khaplu Fort", "Chaqchan Mosque", "Saling Valley"],
    description:
      "Discover the rich heritage of Ghanche through its historical Khaplu Fort, sacred Chaqchan Mosque, and scenic Saling Valley.",
    image: ghanche1,
  },
  {
    days: 5,
    title: "5 Days Ghanche Adventure",
    places: ["Kharfaq Lake", "Barah Valley", "Keris Valley", "Thalay Broq"],
    description:
      "Immerse yourself in the unmatched beauty of Ghanche — from peaceful valleys to the sparkling Kharfaq Lake and Thalay Broq.",
    image: ghanche2,
  },
  {
    days: 7,
    title: "7 Days Ghanche Expedition",
    places: ["Hushe Valley", "Thalay Broq", "Barah Valley", "Khaplu Fort", "Kharfaq Lake", "Keris Valley"],
    description:
      "A week-long journey into the heart of Ghanche — experience its spiritual, cultural, and natural treasures in full.",
    image: ghanche3,
  },
];

export default function GhanchePackages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography sx={{ marginTop: "6%", marginBottom: "4%" }} className="pack-title">
        Ghanche Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {ghanchePackages.map((pkg, idx) => (
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
