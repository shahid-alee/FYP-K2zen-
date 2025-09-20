import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './hotels.scss';

// ✅ Import hotel images
import sereneLake from '../../assets/heroSection/bgimg.jpg';
import shangrilaResort from '../../assets/heroSection/bg1.jpg';
import hunzaInn from '../../assets/heroSection/bg2.jpg';
import highlandView from '../../assets/heroSection/bgimg.jpg';
import karimabadPanorama from '../../assets/heroSection/bg1.jpg';
import deosaiGlamping from '../../assets/heroSection/bg2.jpg';

const hotels = [
  {
    id: 1,
    name: "Serene Lake Resort, Skardu",
    features: ["Lake View Rooms", "Fine Dining", "Spa & Sauna"],
    image: sereneLake,
  },
  {
    id: 2,
    name: "Grand Shangrila Resort",
    features: ["Garden Cottages", "Waterfall Restaurant", "Boating"],
    image: shangrilaResort,
  },
  {
    id: 3,
    name: "Luxury Hunza Inn",
    features: ["Fort View Suites", "Local Cuisine", "Bonfire Nights"],
    image: hunzaInn,
  },
  {
    id: 4,
    name: "Highland View Hotel, Skardu",
    features: ["Mountain View Rooms", "Heated Lobby", "Guided Tours"],
    image: highlandView,
  },
  {
    id: 5,
    name: "Karimabad Panorama, Hunza",
    features: ["Panoramic Balcony", "Cultural Breakfast", "Terrace Dining"],
    image: karimabadPanorama,
  },
  {
    id: 6,
    name: "Deosai Glamping Resort",
    features: ["Luxury Tents", "Night Sky Viewing", "Bonfire Setup"],
    image: deosaiGlamping,
  },
];

export default function Hotels() {
  const navigate = useNavigate();

  const handleBookHotel = (hotel) => {
    navigate("/hotelbooking", { state: { hotel } });
  };

  return (
    <Box className="hotels-section">
      <Typography variant="h3" className="section-title" align="center" marginTop="5%">
        Featured Hotels
      </Typography>
      <Grid container spacing={4}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.id} className="hotel-grid-item">
            <Card className="hotel-card">
              <CardMedia
                component="img"
                image={hotel.image}
                alt={hotel.name}
                className="hotel-image"
              />
              <CardContent className="hotel-content">
                <Typography variant="h6" className="hotel-name">
                  {hotel.name}
                </Typography>
                <ul className="hotel-features">
                  {hotel.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
                <Button
                  className="hotel-btn"
                  onClick={() => handleBookHotel(hotel)}
                >
                  Explore & Book
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
