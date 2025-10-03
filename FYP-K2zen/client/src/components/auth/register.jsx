import React, { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Avatar,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import axios from "axios";
import "./register.scss";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    phone: "",
    dateOfBirth: "",
  });

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  // submit
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      if (response.data.status === true) {
        console.log("✅ Registration successful:", response.data);
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Error registering user");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className="register-container">
      <Grid item xs={12} sm={8} md={5}>
        <Box className="register-box">
          {/* Avatar / Icon */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar sx={{ bgcolor: "var(--primary)", width: 56, height: 56 }}>
              <PersonAddAltIcon fontSize="large" />
            </Avatar>
          </Box>

          {/* Title */}
          <Typography variant="h5" className="register-title">
            Create Your Account
          </Typography>

          {/* Form Fields */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField className="textfield" label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className="textfield" label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField className="textfield" label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField className="textfield" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField className="textfield" label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField className="textfield" label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField className="textfield" label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField className="textfield" label="Street" name="street" value={formData.address.street} onChange={handleAddressChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className="textfield" label="City" name="city" value={formData.address.city} onChange={handleAddressChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="State" name="state" value={formData.address.state} onChange={handleAddressChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className="textfield" label="Postal Code" name="postalCode" value={formData.address.postalCode} onChange={handleAddressChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className="textfield" label="Country" name="country" value={formData.address.country} onChange={handleAddressChange} fullWidth />
            </Grid>
          </Grid>

          {/* Button */}
          <Button variant="contained" color= "success" fullWidth className="register-btn" onClick={handleSignup}>
            Sign Up
          </Button>

          {/* Footer */}
          <Typography variant="body2" align="center" className="register-footer">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" underline="hover" sx={{ color: "var(--primary)" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
