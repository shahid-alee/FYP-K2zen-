import React, { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Avatar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import axios from "axios";
import "./register.scss";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status) {
        setSuccessMessage(res.data.message || "Signup successful!");
        setTimeout(() => {
          navigate("/login"); // Redirect to login after signup
        }, 1500);
      } else {
        setErrorMessage(res.data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const serverMessage =
        err.response?.data?.message || "Server not responding. Please try later.";
      setErrorMessage(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="register-container"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Box className="register-box" p={4} boxShadow={3} borderRadius={3}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar sx={{ bgcolor: "var(--primary)", width: 56, height: 56 }}>
              <PersonAddAltIcon fontSize="large" />
            </Avatar>
          </Box>

          <Typography variant="h5" align="center" className="register-title">
            Create Account
          </Typography>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSignup}
            disabled={loading}
            className="register-btn"
          >
            {loading ? <CircularProgress size={22} /> : "Sign Up"}
          </Button>

          <Typography variant="body2" align="center" className="register-footer">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" color="#2db564" underline="hover" className="login-link">
              Login
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
