import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CardContent,
  Button,
  Divider,
  Chip,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import "./customizeSummary.scss";

const CustomizeSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageData = location.state?.form;
  const [loading, setLoading] = useState(false);

  if (!packageData) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5" color="error">
          ⚠️ No package data found.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/customizePackage")}
        >
          Go Back to Customize
        </Button>
      </Box>
    );
  }

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/customizepackages", packageData);
      setLoading(false);
      navigate("/thankyou", { state: { name: packageData.fullName } });
    } catch (error) {
      setLoading(false);
      console.error("❌ Booking failed:", error);
      alert("Something went wrong while booking. Please try again.");
    }
  };

  return (
    <Box className="summary-page">
      <Paper className="summary-card" elevation={6}>
        <Box className="summary-header">
          <CheckCircleOutlineIcon className="summary-icon" />
          <Typography variant="h4" className="summary-title">
            Package Summary
          </Typography>
          <Typography variant="subtitle1" className="summary-subtitle">
            Review your custom package before confirming
          </Typography>
        </Box>

        <CardContent className="summary-content">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography><b>Full Name:</b> {packageData.fullName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><b>Email:</b> {packageData.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><b>Phone:</b> {packageData.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><b>Duration:</b> {packageData.durationDays} Days</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className="section-heading">
                Selected Destinations
              </Typography>
              <Divider className="section-divider" />
              <Box className="chip-container">
                {packageData.destinationPlaces.map((place, index) => (
                  <Chip key={index} label={place} className="destination-chip" />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography><b>Accommodation:</b> {packageData.accommodationType}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><b>Transport:</b> {packageData.transportType}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><b>Start Date:</b> {packageData.startDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><b>Meals Included:</b> {packageData.mealsIncluded ? "Yes" : "No"}</Typography>
            </Grid>

            {packageData.specialRequests && (
              <Grid item xs={12}>
                <Typography variant="h6" className="section-heading">
                  Special Requests
                </Typography>
                <Divider className="section-divider" />
                <Typography>{packageData.specialRequests}</Typography>
              </Grid>
            )}
          </Grid>

          <Divider className="footer-divider" />

          <Box className="summary-buttons">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              className="edit-btn"
            >
              Edit Package
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleConfirmBooking}
              disabled={loading}
              className="confirm-btn"
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Confirm & Book"
              )}
            </Button>
          </Box>
        </CardContent>
      </Paper>
    </Box>
  );
};

export default CustomizeSummary;
