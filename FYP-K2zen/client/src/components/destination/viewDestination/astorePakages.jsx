import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./scssSheet.scss";

import astore1 from "../../../assets/heroSection/bg1.jpg";
import astore2 from "../../../assets/heroSection/bg2.jpg";
import astore3 from "../../../assets/heroSection/bg1.jpg";

const astorePackages = [
  {
    days: 3,
    title: "3 Days Astore Valley Escape",
    places: ["Kala Pani", "Dirlay Lake", "Allah Wali Jheel"],
    description:
      "Enjoy a short but scenic getaway in Astore Valley — explore the tranquil Allah Wali Jheel, the crystal-clear Dirlay Lake, and the lush meadows of Kala Pani.",
    image: astore1,
  },
  {
    days: 5,
    title: "5 Days Astore Adventure Tour",
    places: ["Domail Rainbow Lake", "Rama Lake", "Kala Pani", "Dirlay Lake"],
    description:
      "Discover the mesmerizing beauty of Astore’s alpine lakes and mountain views in this 5-day tour filled with adventure and serenity.",
    image: astore2,
  },
  {
    days: 7,
    title: "7 Days Astore & Deosai Expedition",
    places: ["Deosai National Park", "Rama Lake", "Allah Wali Jheel", "Domail Rainbow Lake"],
    description:
      "Embark on a week-long exploration through the majestic Deosai Plains, the sparkling lakes of Astore, and the captivating landscapes of northern Pakistan.",
    image: astore3,
  },
];

export default function AstorePackages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography sx={{ marginTop: "6%", marginBottom: "4%" }} className="pack-title">
        Astore Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {astorePackages.map((pkg, idx) => (
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
