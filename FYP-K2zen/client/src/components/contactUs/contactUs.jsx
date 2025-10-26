import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import "./contactus.scss";

export default function ContactUs() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/contact", form);
      setAlert({
        open: true,
        message: "Message sent successfully!",
        severity: "success",
      });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setAlert({
        open: true,
        message: "Failed to send message!",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="contactus-page">
      <Typography variant="h4" className="section-title">
        Contact Us
      </Typography>
      <Typography variant="body1" className="section-subtitle">
        Have questions or want to book your next adventure? We’d love to hear from you.
      </Typography>

      <Grid container spacing={5} className="contactus-grid">
        {/* LEFT SIDE FORM */}
        <Grid item xs={12} md={7}>
          <Box component="form" onSubmit={handleSubmit} className="contact-form">
            <Typography variant="h5" className="form-title">
              Send Us a Message
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  value={form.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
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
                  value={form.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Subject"
                  name="subject"
                  fullWidth
                  value={form.subject}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  name="message"
                  multiline
                  rows={5}
                  fullWidth
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* RIGHT SIDE CONTACT INFO */}
        <Grid item xs={12} md={5}>
          <Box className="contact-info">
            <Typography variant="h5" className="info-title">
              Get in Touch
            </Typography>

            <Box className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <Typography>
                K2ZenAdventure, Skardu, Gilgit-Baltistan, Pakistan
              </Typography>
            </Box>

            <Box className="info-item">
              <FaPhoneAlt className="info-icon" />
              <Typography>+92 333 1234567</Typography>
            </Box>

            <Box className="info-item">
              <FaEnvelope className="info-icon" />
              <Typography>k2zenadventure@gmail.com</Typography>
            </Box>

            <Box className="map-container">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28914.217628514294!2d75.5820182!3d35.3359828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38f53f7981f2c8a7%3A0xa364fa2d1e3e9a5f!2sSkardu!5e0!3m2!1sen!2s!4v1694449278123!5m2!1sen!2s"
                width="100%"
                height="220"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
