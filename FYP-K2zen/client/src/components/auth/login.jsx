import React, { useState } from "react";
import { Grid, Box, TextField, Button, Typography, Link, Alert } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", { email, password });
      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/home");
      } else {
        setErrorMessage(res.data.message || "Login failed");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={4}>
        <Box p={4} boxShadow={3} borderRadius={2} bgcolor="background.paper">
          <Typography variant="h5" component="h1" gutterBottom>Login</Typography>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
          <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Link component={RouterLink} to="/register" sx={{ color: "green" }}>Sign Up</Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
