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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import "./register.scss"; // ✅ Same style as Signup for consistency

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    setErrorMessage("");
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/auth/login", formData);

      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        setErrorMessage(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      const serverMessage =
        err.response?.data?.message || "Server not responding. Please try again later.";
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
      {/* Left side image section (optional) */}
      <Grid
        item
        xs={false}
        sm={6}
        md={6}
        sx={{
          backgroundImage: "url('/assets/login-bg.jpg')", // replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", sm: "block" },
        }}
      />

      {/* Right side form */}
      <Grid item xs={12} sm={6} md={4}>
        <Box className="register-box" p={4} boxShadow={3} borderRadius={3}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar sx={{ bgcolor: "green", width: 56, height: 56 }}>
              <LockOpenIcon fontSize="large" />
            </Avatar>
          </Box>

          <Typography variant="h5" align="center" gutterBottom>
            Login to Your Account
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

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

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Login"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Link component={RouterLink} to="/register" underline="hover" sx={{ color: "green" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
