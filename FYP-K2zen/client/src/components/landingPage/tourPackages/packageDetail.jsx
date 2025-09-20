import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Chip, Container, Paper } from "@mui/material";
import "./packageDetail.scss";

export default function PackageDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const pkg = location.state;

  if (!pkg) {
    return (
      <Container maxWidth="md">
        <Box p={5} textAlign="center">
          <Typography variant="h5" color="error" gutterBottom>
            Package not found
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={4} className="details-container">
        {/* Banner Image */}
        <Box className="details-banner">
          <img src={pkg.image} alt={pkg.title} className="banner-img" />
        </Box>

        {/* Title */}
        <Typography variant="h4" className="details-title" gutterBottom>
          {pkg.title}
        </Typography>

        {/* Duration */}
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Duration: <strong>{pkg.days} Days</strong>
        </Typography>

        {/* Description */}
        <Typography variant="body1" className="details-description" paragraph>
          {pkg.description}
        </Typography>

        {/* Places */}
        <Typography variant="h6" className="details-subtitle" gutterBottom>
          Places Covered:
        </Typography>
        <Box className="details-places">
          {pkg.places.map((place, i) => (
            <Chip
              key={i}
              label={place}
              color="primary"
              className="place-chip"
            />
          ))}
        </Box>

        {/* Actions */}
        <Box className="details-actions">
          <Button variant="contained" color="primary" size="large">
            Proceed to Booking
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
