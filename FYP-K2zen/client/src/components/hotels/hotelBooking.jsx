import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import "./hotelbooking.scss";

export default function HotelBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel;

  if (!hotel) {
    return (
      <Box className="hotelbooking-section">
        <Typography variant="h5" align="center">
          No hotel details found. Please go back.
        </Typography>
        <Button onClick={() => navigate(-1)} className="back-btn">
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box className="hotelbooking-section">
      {/* Header */}
      <Box className="hotel-header">
        <img src={hotel.image} alt={hotel.name} className="hotel-banner" />
        <Typography variant="h3" className="hotel-title">
          {hotel.name}
        </Typography>
      </Box>

      {/* Hotel Details */}
      <Grid container spacing={4} className="hotel-details">
        {/* Hotel Info */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="hotel-info">
            <Typography variant="h5" className="section-heading">
              About This Hotel
            </Typography>
            <ul className="feature-list">
              {hotel.features.map((feat, index) => (
                <li key={index}>{feat}</li>
              ))}
            </ul>
            <Typography variant="body1" className="hotel-desc">
              Experience comfort and luxury at <strong>{hotel.name}</strong>,
              surrounded by the breathtaking landscapes of Gilgit-Baltistan.
              Whether you’re planning a romantic getaway or a family trip, this
              hotel ensures a stay that’s both relaxing and memorable.
            </Typography>
          </Paper>
        </Grid>

        {/* Booking Form */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="booking-form">
            <Typography variant="h5" className="section-heading">
              Book Your Stay
            </Typography>
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="date" placeholder="Check-in Date" required />
              <input type="date" placeholder="Check-out Date" required />
              <input type="number" placeholder="Guests" required />
              <Button type="submit" className="submit-btn">
                Confirm Booking
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
