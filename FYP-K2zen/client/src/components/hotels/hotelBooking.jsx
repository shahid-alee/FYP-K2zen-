import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import axios from "axios";
import "./hotelbooking.scss";

export default function HotelBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel;

  const [price, setPrice] = useState(20);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  if (!hotel) {
    return (
      <Box className="hotelbooking-section">
        <Typography variant="h5" align="center" className="no-hotel-text">
          No hotel details found. Please go back.
        </Typography>
        <Button onClick={() => navigate(-1)} className="back-btn">
          Go Back
        </Button>
      </Box>
    );
  }

  const hotelImage = `http://localhost:8000/${hotel.image?.replace(/\\/g, "/")}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🏷️ Handle booking submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price < 20 || price > 80) {
      alert("Please select a price between $20 and $80.");
      return;
    }

    const bookingData = {
      ...formData,
      price,
      hotelName: hotel.name,
      hotelImage,
    };

    try {
      const res = await axios.post("http://localhost:8000/api/bookings/hotels", bookingData);
      console.log("Booking Saved:", res.data);
      navigate("/thankCard"); // Optional thank you page
    } catch (error) {
      console.error("Booking failed:", error);
     
    }
  };

  return (
    <Box className="hotelbooking-section">
      {/* 🌄 Header */}
      <Box className="hotel-header">
        <img src={hotelImage} alt={hotel.name} className="hotel-banner" />
        <Box className="overlay" />
        <Typography variant="h3" className="hotel-title">
          {hotel.name}
        </Typography>
      </Box>

      {/* 🏨 Hotel Details Section */}
      <Grid container spacing={5} className="hotel-details">
        {/* Hotel Info */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="hotel-info">
            <Typography variant="h5" className="section-heading">About This Hotel</Typography>

            <Typography variant="body1" className="hotel-desc">
              Experience comfort and luxury at <strong>{hotel.name}</strong>, located in the scenic region of <strong>{hotel.location}</strong>.
            </Typography>

            <Typography variant="h6" className="features-heading">Hotel Features</Typography>
            <ul className="feature-list">
              {hotel.features?.length ? (
                hotel.features.map((feat, index) => <li key={index}>{feat}</li>)
              ) : (
                <li>No specific features listed.</li>
              )}
            </ul>

            <Typography className="hotel-status">
              Status:{" "}
              <span className={hotel.status === "Available" ? "available" : "unavailable"}>
                {hotel.status}
              </span>
            </Typography>

            <Typography className="hotel-price">💲 Price: {hotel.price || "$20 - $50"}</Typography>
          </Paper>
        </Grid>

        {/* Booking Form */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="booking-form">
            <Typography variant="h5" className="section-heading">Book Your Stay</Typography>
            <form onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <input name="checkIn" type="date" value={formData.checkIn} onChange={handleChange} required />
              <input name="checkOut" type="date" value={formData.checkOut} onChange={handleChange} required />
              <input name="guests" type="number" placeholder="Guests" value={formData.guests} onChange={handleChange} required />

              <div className="price-range">
                <label>Price per night ($20 - $80):</label>
                <input type="number" min="20" max="80" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
              </div>

              <Button type="submit" className="submit-btn">Confirm Booking</Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
