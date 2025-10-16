// src/components/Packages/Packages.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./scssSheet.scss";

export default function Packages() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/packages");
        setPackages(res.data);
      } catch (err) {
        console.error("❌ Fetch packages error:", err);
        setError("Failed to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={5}>
        {error}
      </Typography>
    );

  if (packages.length === 0)
    return (
      <Typography textAlign="center" mt={5}>
        No tour packages available yet.
      </Typography>
    );

  return (
    <Box className="pack-section">
      <Typography sx={{ marginTop: "6%", marginBottom: "4%" }} className="pack-title">
        Tour Packages
      </Typography>

      {/* ✅ Group packages by destination */}
      {Object.entries(
        packages.reduce((acc, pkg) => {
          const destination = pkg.destinationName || "Other";
          if (!acc[destination]) acc[destination] = [];
          acc[destination].push(pkg);
          return acc;
        }, {})
      ).map(([destination, destPackages]) => (
        <Box key={destination} sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, ml: 2, color: "#1976d2" }}>
            📍 {destination}
          </Typography>

          <Grid container spacing={3} className="cardContainer">
            {destPackages.map((pkg) => (
              <Grid item xs={12} sm={6} md={4} key={pkg._id}>
                <Card className="tour-card">
                  <CardMedia
                    component="img"
                    image={
                      pkg.image?.startsWith("http")
                        ? pkg.image
                        : `http://localhost:8000/${pkg.image?.replace(/\\/g, "/")}`
                    }
                    alt={pkg.title}
                    className="card-media"
                  />
                  <CardContent className="card-details">
                    <Typography variant="h6" className="card-title">
                      {pkg.title}
                    </Typography>
                    <Typography variant="subtitle2" className="duration">
                      Duration: {pkg.days} Days
                    </Typography>
                    <Typography variant="subtitle2" className="destination">
                      Destination: {pkg.destinationName}
                    </Typography>
                    <Typography variant="subtitle2" className="location">
                      Location: {pkg.location}
                    </Typography>
                    <Typography variant="subtitle2" className="price">
                      Price: PKR {pkg.price}
                    </Typography>

                    <Typography variant="body2" className="card-description">
                      {pkg.description}
                    </Typography>

                    {pkg.places && pkg.places.length > 0 && (
                      <ul className="place-list">
                        {pkg.places.map((place, i) => (
                          <li key={i}>{place}</li>
                        ))}
                      </ul>
                    )}

                    <Button
                      variant="contained"
                      className="tour-btn"
                      onClick={() => handleBookNow(pkg)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
