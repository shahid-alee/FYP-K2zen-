import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './scssSheet.scss';

import day1Img from '../../assets/heroSection/bg1.jpg';
import day3Img from '../../assets/heroSection/bg2.jpg';
import day5Img from '../../assets/heroSection/bg1.jpg';
import day7Img from '../../assets/heroSection/bg2.jpg';

const skarduPackages = [
  { days: 1, title: 'Day 1: Explore Skardu', places: ['Sadpara Lake', 'Manthal Buddha Rock','Upper Kachura Lake'], image: day1Img },
  { days: 3, title: '3 Days Skardu Tour', places: ['Upper Kachura Lake','Soq Valley', 'Shigar Fort','Blind Lake', 'Katpana Cold Desert'], image: day3Img },
  { days: 5, title: '5 Days Skardu Adventure', places: ['Khaplu Valley', 'Deosai National Park', 'Upper Kachura Lake','Shangrila Resort','Chunda'], image: day5Img },
  { days: 7, title: '7 Days Skardu & Surroundings', places: ['Chunda Valley', 'Deosai', 'Shigar', 'Khaplu','Kharmang'], image: day7Img },
];

export default function SkarduPackages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    navigate("/bookNow", { state: { pkg } });
  };

  return (
    <Box className="pack-section">
      <Typography sx={{marginTop:'5%' , marginBottom:'5%'}} variant="h4" className="pack-title">Skardu Tour Packages</Typography>

      <Grid container spacing={4} className="cardContainer">
        {skarduPackages.map((pkg, idx) => (
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
