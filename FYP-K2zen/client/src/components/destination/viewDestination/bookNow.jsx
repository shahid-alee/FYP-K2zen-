import React, { useState } from "react";
import { Box, TextField, Typography, Button, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./bookNow.scss";

export default function BookNow() {
  const navigate = useNavigate();
  const location = useLocation();
  // receive package data from state
  const pkg = location.state?.pkg || {};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    numberOfPeople: 1,
    startDate: "",
    endDate: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    else if (formData.endDate < formData.startDate) newErrors.endDate = "End date can’t be before start date";
    // more validations as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // send to backend or API
    console.log("Booking data:", { pkg, ...formData });
    // after successful booking, maybe navigate or show success message
    navigate("/bookingSuccess", { state: { pkg, ...formData } });
  };

  return (
    <Box className="booknow-page">
      <Typography variant="h4" className="booknow-title">
        Book Package
      </Typography>

      {pkg.title && (
        <Box className="package-summary">
          <Typography variant="h6">Selected Package:</Typography>
          <Typography>{pkg.title}</Typography>
          <Typography>Duration: {pkg.days} {pkg.days > 1 ? "Days" : "Day"}</Typography>
        </Box>
      )}

      <Box component="form" className="booknow-form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Number of People"
          name="numberOfPeople"
          type="number"
          value={formData.numberOfPeople}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
        />

        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          error={!!errors.startDate}
          helperText={errors.startDate}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          error={!!errors.endDate}
          helperText={errors.endDate}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Special Requests"
          name="specialRequests"
          multiline
          rows={4}
          value={formData.specialRequests}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" className="booknow-btn">
          Confirm Booking
        </Button>
      </Box>
    </Box>
  );
}
