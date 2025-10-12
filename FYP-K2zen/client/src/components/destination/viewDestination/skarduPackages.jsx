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

const skarduPackages = [
  {
    days: 3,
    title: "3 Days Skardu Highlights Tour",
    places: ["Satpara Lake", "Kachura Lake", "Katpana Cold Desert"],
    description:
      "Discover the essence of Skardu in 3 unforgettable days — from the peaceful Satpara Lake and crystal-clear Kachura waters to the mesmerizing dunes of Katpana Desert.",
    image: day3Img,
  },
  {
    days: 5,
    title: "5 Days Skardu Adventure Trip",
    places: [
      "Deosai National Park",
      "Basho Valley",
      "Katpana Cold Desert",
      "Kachura Lake",
      "Satpara Lake",
    ],
    description:
      "This 5-day adventure offers the perfect mix of thrill and tranquility — experience the vast wilderness of Deosai, the serenity of Basho, and the charm of Skardu’s iconic lakes.",
    image: day5Img,
  },
  {
    days: 7,
    title: "7 Days Complete Skardu Experience",
    places: [
      "Chunda Valley",
      "Deosai National Park",
      "Nangsoq Valley",
      "Basho Valley",
      "Satpara Lake",
      "Kachura Lake",
      "Katpana Cold Desert",
    ],
    description:
      "Immerse yourself in the full beauty of Baltistan with a week-long journey — from the breathtaking Deosai Plains and lush valleys to Skardu’s tranquil lakes and cold desert.",
    image: day7Img,
  },
];

export default function SkarduPackages() {
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
        Skardu Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {skarduPackages.map((pkg, idx) => (
          <Grid item xs={12} key={idx}>
            <Card className="tour-card">
              {/* 👈 Image on Right Side (controlled in CSS using row-reverse) */}
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
