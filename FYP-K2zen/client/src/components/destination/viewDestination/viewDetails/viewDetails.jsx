import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Divider,
} from "@mui/material";

export default function ViewDetail() {
  const location = useLocation();
  const { id } = location.state || {};
  const [pkg, setPkg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPackage = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/packages/${id}`);
          setPkg(res.data);
        } catch (error) {
          console.error("Error fetching package details:", error);
        }
      };
      fetchPackage();
    }
  }, [id]);

  if (!pkg) {
    return (
      <Box
        sx={{
          py: 5,
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        <Typography variant="h6">Loading package details...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 5,
        px: { xs: 2, md: 6 },
        backgroundColor: "#f9fafc",
        minHeight: "100vh",
      }}
    >
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          borderColor: "#1C7942",
          color: "#1C7942",
          "&:hover": { backgroundColor: "#1C7942", color: "#fff" },
        }}
      >
        Back
      </Button>

      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        {/* Package Image */}
        <CardMedia
          component="img"
          height="400"
          image={
            pkg.image
              ? `http://localhost:8000/${pkg.image.replace(/\\/g, "/")}`
              : "https://via.placeholder.com/600x400"
          }
          alt={pkg.title || "Package Image"}
        />

        {/* Package Content */}
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1C7942", mb: 2 }}
          >
            {pkg.title}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Destination:</strong> {pkg.destination}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Duration:</strong> {pkg.days} Days
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Price:</strong> PKR {pkg.price?.toLocaleString()}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              {pkg.places?.length > 0 && (
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  <strong>Places Included:</strong> {pkg.places.join(", ")}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Overview Section */}
          <Typography
            variant="h5"
            sx={{ color: "#239753", fontWeight: "bold", mb: 1 }}
          >
            Overview
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
            {pkg.overview || "No overview available for this package."}
          </Typography>

          {/* Itinerary Section */}
          {pkg.itinerary && (
            <>
              <Typography
                variant="h5"
                sx={{ color: "#239753", fontWeight: "bold", mb: 1 }}
              >
                Itinerary
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {pkg.itinerary}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
