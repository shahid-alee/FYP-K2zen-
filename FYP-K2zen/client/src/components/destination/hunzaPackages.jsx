import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom"; // 👈 add this
import './scssSheet.scss';

import day3Img from '../../assets/heroSection/bg2.jpg';
import day5Img from '../../assets/heroSection/bg1.jpg';
import day7Img from '../../assets/heroSection/bg2.jpg';
import day10Img from '../../assets/heroSection/bg1.jpg'; // 👈 new image

const hunzaPackages = [
  { days: 3, title: '3 Days Hunza Escape', places: ['Altit Fort', 'Baltit Fort', 'Passu Cones'], image: day3Img },
  { days: 5, title: '5 Days Hunza & Surroundings', places: ['Attabad Lake', "Eagle's Nest", 'Khunjerab Pass'], image: day5Img },
  { days: 7, title: '7 Days Hunza Deluxe Tour', places: ['Gulmit', 'Attabad', 'Karimabad', 'Passu'], image: day7Img },
  { days: 10, title: '10 Days Hunza Explorer', places: ['Altit Fort','Baltit Fort','Hopper Glacier', 'Hussaini Suspension Bridge', 'Khunjerab Pass', 'Rakaposhi View Point', 'Karimabad'], image: day10Img },
];

export default function HunzaPackages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography sx={{ marginTop: '5%', marginBottom: "5%" }} variant="h4" className="pack-title">
        Hunza Tour Packages
      </Typography>

      <Grid container spacing={4} className="cardContainer">
        {hunzaPackages.map((pkg, idx) => (
          <Grid item xs={12} sm={6} md={6} key={pkg.days + '-' + idx}>
            <Card
              className="tour-card"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <CardMedia
                component="img"
                image={pkg.image}
                alt={pkg.title}
                className="card-media"
                sx={{
                  width: { xs: '100%', md: '40%' },
                  height: { xs: 220, md: 'auto' },
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />

              <CardContent
                className="card-details"
                sx={{
                  width: { xs: '100%', md: '60%' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 1.5,
                  p: { xs: 2, md: 3 },
                }}
              >
                <Typography variant="h6" className="card-title">{pkg.title}</Typography>

                <Typography variant="subtitle2" className="duration">
                  Duration: {pkg.days} Day{pkg.days > 1 ? 's' : ''}
                </Typography>

                <ul className="place-list">
                  {pkg.places.map((p, i) => (<li key={i}>{p}</li>))}
                </ul>

                <Button
                  variant="contained"
                  className="tour-btn"
                  sx={{
                    width: { xs: '100%', md: 'auto' },
                    alignSelf: { xs: 'stretch', md: 'flex-start' },
                  }}
                  onClick={() => handleBookNow(pkg)} 
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
