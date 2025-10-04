import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SkarduPackages() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/tours")
      .then(res => setTours(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography sx={{ marginTop: '5%', marginBottom: '5%' }} variant="h4" className="pack-title">
        Skardu Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {tours.map((pkg) => (
          <Grid item xs={12} sm={6} md={6} key={pkg._id}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <CardMedia
                component="img"
                image={pkg.image}
                alt={pkg.name}
                sx={{ width: { xs: '100%', md: '40%' }, height: { xs: 220, md: 'auto' }, objectFit: 'cover' }}
              />
              <CardContent sx={{ width: { xs: '100%', md: '60%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1.5, p: { xs: 2, md: 3 } }}>
                <Typography variant="h6">{pkg.name}</Typography>
                <Typography variant="subtitle2">Location: {pkg.location}</Typography>
                <Typography variant="body2">{pkg.description}</Typography>
                <Typography variant="subtitle2" color={pkg.status === "Available" ? "green" : "red"}>
                  Status: {pkg.status}
                </Typography>
                <Button variant="contained" onClick={() => handleBookNow(pkg)}>Book Now</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
