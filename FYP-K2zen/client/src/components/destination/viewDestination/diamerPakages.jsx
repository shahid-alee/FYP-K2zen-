import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./scssSheet.scss";

import diamer1 from "../../../assets/heroSection/bg1.jpg";
import diamer2 from "../../../assets/heroSection/bg2.jpg";
import diamer3 from "../../../assets/heroSection/bg1.jpg";

const diamerPackages = [
  {
    days: 3,
    title: "3 Days Diamer Discovery",
    places: ["Chilas Valley", "Thalpan Petroglyphs", "Darel Valley"],
    description:
      "Experience the cultural roots of Diamer by exploring Chilas Valley, ancient Thalpan Petroglyphs, and the serene Darel Valley.",
    image: diamer1,
  },
  {
    days: 5,
    title: "5 Days Diamer Adventure",
    places: ["Darel Valley", "Chilas Valley", "Babusar Pass", "Thalpan Petroglyphs"],
    description:
      "A 5-day trip through the majestic Diamer region featuring lush valleys, breathtaking mountain passes, and ancient carvings.",
    image: diamer2,
  },
  {
    days: 7,
    title: "7 Days Fairy Meadows & Diamer Expedition",
    places: ["Fairy Meadows", "Babusar Pass", "Darel Valley", "Chilas Valley", "Thalpan Petroglyphs"],
    description:
      "An unforgettable week-long journey to the base of Nanga Parbat — enjoy Fairy Meadows, Babusar Pass, and the ancient heart of Diamer.",
    image: diamer3,
  },
];

export default function DiamerPackages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography sx={{ marginTop: "6%", marginBottom: "4%" }} className="pack-title">
        Diamer Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {diamerPackages.map((pkg, idx) => (
          <Grid item xs={12} key={idx}>
            <Card className="tour-card">
              {/* Left Content */}
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

              {/* Right Image */}
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
