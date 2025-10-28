import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import axios from "axios";
import "./carBooking.scss";

export default function CarBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
  });

  if (!car) {
    return (
      <Box className="carbooking-section">
        <Typography variant="h5" align="center">
          No car details found. Please go back.
        </Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

  const carImage = `http://localhost:8000/${car.image.replace(/\\/g, "/")}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateDays = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalDays = calculateDays();
    if (totalDays <= 0) {
      alert("❌ Please select valid start and end dates.");
      return;
    }

    const totalPrice = totalDays * car.pricePerDay;

    const bookingData = {
      name: formData.name,
      email: formData.email,
      contact: formData.phone,
      carName: car.carName,
      modelYear: String(car.modelYear), // ✅ matches schema
      totalDays,
      totalPrice,
      status: "Pending",
      image: car.image,
    };

    console.log("Sending booking:", bookingData);

    try {
      await axios.post("http://localhost:8000/api/carbooking", bookingData);
      alert("✅ Car booking confirmed!");
      navigate("/thankCard");
    } catch (error) {
      console.error("❌ Booking failed:", error.response || error);
      alert("❌ Booking failed. Please try again.");
    }
  };

  return (
    <Box className="carbooking-section">
      <Box className="car-header">
        <img src={carImage} alt={car.carName} className="car-banner" />
        <Box className="overlay" />
        <Typography variant="h3" className="car-title">{car.carName}</Typography>
      </Box>

      <Grid container spacing={5} className="car-details">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="car-info">
            <Typography variant="h5">Car Details</Typography>
            <Typography variant="body1">
              {car.carName} ({car.modelYear}) | Seats: {car.seats}
            </Typography>
            <Typography variant="body1">Price per day: PKR {car.pricePerDay}</Typography>
            <Typography variant="body1">Location: {car.location}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="booking-form">
            <Typography variant="h5">Book This Car</Typography>
            <form onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
              <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
              <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />

              {formData.startDate && formData.endDate && (
                <Typography variant="body2" sx={{ mt: 1, textAlign: "center", color: "gray" }}>
                  Total Days: <b>{calculateDays()}</b> | Total Price: <b>PKR {calculateDays() * car.pricePerDay}</b>
                </Typography>
              )}

              <Button variant="success"  type="submit" className="submit-btn">Confirm Booking</Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
