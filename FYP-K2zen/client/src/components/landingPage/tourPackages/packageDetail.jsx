import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  Container,
  Paper,
  Divider,
} from "@mui/material";
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="details-page">
      <Paper elevation={6} className="details-container">
        {/* Banner */}
        <Box className="details-banner">
          <img src={pkg.image} alt={pkg.title} className="banner-img" />
          <Box className="banner-overlay">
            <Typography variant="h4" className="banner-title">
              {pkg.title}
            </Typography>
          </Box>
        </Box>

        {/* Info Section */}
        <Box className="details-content">
          <Typography variant="subtitle1" className="duration">
            Duration: <strong>{pkg.days} Days</strong>
          </Typography>

          {pkg.description && (
            <Typography variant="body1" className="details-description" paragraph>
              {pkg.description}
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Places */}
          <Typography variant="h6" className="details-subtitle" gutterBottom>
            Places Covered
          </Typography>
          <Box className="details-places">
            {pkg.places.map((place, i) => (
              <Chip key={i} label={place} color="primary" className="place-chip" />
            ))}
          </Box>

          {/* Actions */}
          <Box className="details-actions">
            <Button
              variant="contained"
              size="large"
              className="book-btn"
              onClick={() => navigate("/bookNow", { state: { pkg } })}
            >
              Proceed to Booking
            </Button>
            <Button
              variant="outlined"
              size="large"
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
