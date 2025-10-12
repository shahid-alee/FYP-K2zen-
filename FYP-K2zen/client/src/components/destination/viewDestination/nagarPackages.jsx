import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./scssSheet.scss";

import nagar1 from "../../../assets/heroSection/bg1.jpg";
import nagar2 from "../../../assets/heroSection/bg2.jpg";
import nagar3 from "../../../assets/heroSection/bg1.jpg";

const nagarPackages = [
  {
    days: 3,
    title: "3 Days Nagar Valley Tour",
    places: ["Sikandarabad Valley", "Rakaposhi View Point", "Kacheli Lake"],
    description:
      "Discover the peaceful valleys and stunning views of Rakaposhi. Enjoy the calm waters of Kacheli Lake and the charm of Sikandarabad.",
    image: nagar1,
  },
  {
    days: 5,
    title: "5 Days Nagar & Rakaposhi Adventure",
    places: ["Rakaposhi Base Camp", "Kacheli Lake", "Sikandarabad Valley", "Rush Lake"],
    description:
      "Experience Nagar’s beauty in this 5-day journey through Rakaposhi’s foothills, hidden lakes, and breathtaking alpine landscapes.",
    image: nagar2,
  },
  {
    days: 7,
    title: "7 Days Rush Lake & Nagar Expedition",
    places: ["Rush Lake", "Rakaposhi", "Kacheli Lake", "Sikandarabad Valley"],
    description:
      "A week-long adventure through Nagar’s highest lakes and mountain trails — the perfect expedition for nature and trekking lovers.",
    image: nagar3,
  },
];

export default function NagarPackages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography sx={{ marginTop: "6%", marginBottom: "4%" }} className="pack-title">
        Nagar Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {nagarPackages.map((pkg, idx) => (
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
