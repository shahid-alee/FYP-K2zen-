import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./bookNow.scss";

export default function BookNow({ onClose, onSubmit }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pkg = location.state?.pkg; // <-- package from navigation

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    guests: 1,
    startDate: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form); // call parent if passed
    alert("Booking Confirmed!"); // just for demo
  };

  return (
    <Box className="booknow-container">
      <Typography variant="h5" className="booknow-title">
        Book: {pkg ? pkg.title : "No Package Selected"}
      </Typography>

      <form onSubmit={handleSubmit} className="booknow-form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              variant="outlined"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              variant="outlined"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phone"
              fullWidth
              variant="outlined"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              variant="outlined"
              value={form.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              fullWidth
              variant="outlined"
              value={form.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Guests"
              name="guests"
              type="number"
              fullWidth
              variant="outlined"
              value={form.guests}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              variant="outlined"
              value={form.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Additional Requirements / Message"
              name="message"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={form.message}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} className="booknow-buttons">
            <Button type="submit" variant="contained" className="booknow-submit">
              Confirm Booking
            </Button>
            <Button
              variant="outlined"
              className="booknow-cancel"
              onClick={() => (onClose ? onClose() : navigate(-1))}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
