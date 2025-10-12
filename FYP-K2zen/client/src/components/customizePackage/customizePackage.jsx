import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./customizePackage.scss";
import { useNavigate } from "react-router-dom";

export default function CustomizePackage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    numberOfPeople: 1,
    durationDays: "",
    destinationPlaces: [],
    accommodationType: "",
    transportType: "",
    startDate: "",
    mealsIncluded: false,
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});

  const placesOptions = [
    "Skardu",
    "Hunza",
    "Gilgit",
    "Astore",
    "Diamer",
    "Shiger",
    "Ghanche",
    "Kharmang",
    "Ghizer",
    "Nagar",
  ];

  const accommodationOptions = ["Budget", "Standard", "Deluxe"];
  const transportOptions = ["Private Car", "Van", "Shared Transport"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handlePlacesSelect = (e) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      destinationPlaces: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.durationDays) newErrors.durationDays = "Duration is required";
    if (form.destinationPlaces.length === 0)
      newErrors.destinationPlaces = "Select at least one destination";
    if (!form.accommodationType)
      newErrors.accommodationType = "Select accommodation type";
    if (!form.transportType) newErrors.transportType = "Select transport type";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Customized Package Request:", form);
    navigate("/customizeSummary", { state: { form } });
  };

  return (
    <Box className="customize-page">
      <div className="customize-header">
        <Typography variant="h3" className="customize-title">
          Customize Your Tour Package
        </Typography>
        <Typography variant="h6" className="customize-subtitle">
          Plan your dream adventure through Gilgit-Baltistan your way — select your destinations, accommodation, and transport options to craft a personalized travel experience.
        </Typography>
      </div>

      <Card className="customize-card">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Number of People"
                name="numberOfPeople"
                type="number"
                value={form.numberOfPeople}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Duration (Days)"
                name="durationDays"
                type="number"
                value={form.durationDays}
                onChange={handleChange}
                error={!!errors.durationDays}
                helperText={errors.durationDays}
                inputProps={{ min: 1 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.destinationPlaces}>
                <InputLabel id="places-label">Destinations / Places</InputLabel>
                <Select
                  labelId="places-label"
                  multiple
                  value={form.destinationPlaces}
                  onChange={handlePlacesSelect}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {placesOptions.map((place) => (
                    <MenuItem key={place} value={place}>
                      <Checkbox checked={form.destinationPlaces.indexOf(place) > -1} />
                      <Typography>{place}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                {errors.destinationPlaces && (
                  <Typography variant="caption" color="error">
                    {errors.destinationPlaces}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.accommodationType}>
                <InputLabel>Accommodation Type</InputLabel>
                <Select
                  name="accommodationType"
                  value={form.accommodationType}
                  onChange={handleChange}
                >
                  {accommodationOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
                {errors.accommodationType && (
                  <Typography variant="caption" color="error">
                    {errors.accommodationType}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.transportType}>
                <InputLabel>Transport Type</InputLabel>
                <Select
                  name="transportType"
                  value={form.transportType}
                  onChange={handleChange}
                >
                  {transportOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
                {errors.transportType && (
                  <Typography variant="caption" color="error">
                    {errors.transportType}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                error={!!errors.startDate}
                helperText={errors.startDate}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="mealsIncluded"
                    checked={form.mealsIncluded}
                    onChange={handleChange}
                  />
                }
                label="Include Meals"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Special Requests"
                name="specialRequests"
                multiline
                rows={4}
                value={form.specialRequests}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className="customize-btn"
                onClick={handleSubmit}
              >
                Build My Package
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
