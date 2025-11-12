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
import "./login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      const res = await axios.post("http://localhost:8000/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("userChanged")); // 🔥 Notify NavBar
        navigate("/");
      } else {
        setErrorMessage(res.data.message || "Invalid email or password.");
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
      className="login-container"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Box className="login-box" p={4} boxShadow={3} borderRadius={3}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar sx={{ bgcolor: "var(--primary)", width: 56, height: 56 }}>
              <LockOpenIcon fontSize="large" />
            </Avatar>
          </Box>

          <Typography variant="h5" align="center" className="login-title">
            Please login to continue
          </Typography>
{/* 
          <Typography variant="body2" align="center" className="login-subtitle">
            Please login to continue
          </Typography> */}

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
            className="login-btn"
          >
            {loading ? <CircularProgress size={22} /> : "Login"}
          </Button>

          <Typography variant="body2" align="center" className="login-footer">
            Don’t have an account?{" "}
            <Link component={RouterLink} to="/register" color="#2db564" underline="hover" className="signup-link">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
