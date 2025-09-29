import React from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./contactus.scss";

export default function ContactUs() {
  // Reusable style for all input fields
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      background: "#fafafa",
      "& fieldset": {
        borderColor: "#d1d9e6",
      },
      "&:hover fieldset": {
        borderColor: "#2DB564",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2DB564",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#555",
      fontWeight: "500",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#2DB564",
    },
  };

  return (
    <Box className="contactus-section">
      {/* Title */}
      <Typography variant="h3" className="contact-heading">
        Get in Touch
      </Typography>
      <Typography variant="body1" className="contact-subheading">
        Have questions or want to book your next adventure?  
        Fill out the form or reach us directly via the contact details below.
      </Typography>

      <Grid container spacing={5} className="contact-grid">
        {/* Contact Form */}
        <Grid item xs={12} md={7} className="formBox">
          <Box className="contact-form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="First Name" fullWidth variant="outlined" sx={inputStyle} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Last Name" fullWidth variant="outlined" sx={inputStyle} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" fullWidth variant="outlined" sx={inputStyle} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone Number" fullWidth variant="outlined" sx={inputStyle} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Subject" fullWidth variant="outlined" sx={inputStyle} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" className="submit-btn">
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={5} className="mapBox">
          <Box className="contact-info">
            <Typography variant="h5" className="info-title">
              Contact Information
            </Typography>

            <Box className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <Typography>K2ZenAdventure Skardu, Gilgit-Baltistan, Pakistan</Typography>
            </Box>

            <Box className="info-item">
              <FaPhoneAlt className="info-icon" />
              <Typography>+92 333 1234567</Typography>
            </Box>

            <Box className="info-item">
              <FaEnvelope className="info-icon" />
              <Typography>k2zenadventure@gmail.com</Typography>
            </Box>

            <Box className="map-box">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28914.217628514294!2d75.5820182!3d35.3359828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38f53f7981f2c8a7%3A0xa364fa2d1e3e9a5f!2sSkardu!5e0!3m2!1sen!2s!4v1694449278123!5m2!1sen!2s"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
