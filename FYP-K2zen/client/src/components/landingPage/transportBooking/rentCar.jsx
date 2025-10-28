import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./rentCar.scss";

export default function TransportBooking() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:8000/api/rentcar";

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_URL);
        setCars(res.data);
      } catch (error) {
        console.error("Error fetching rent cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleBookNow = (car) => {
    navigate("/carbooking", { state: { car } });
  };

  return (
    <Box className="rentcar-page">
      <Box className="section-header">
        <Typography variant="h4" className="section-title">
          Transport Booking
        </Typography>
        <Typography variant="body1" className="section-subtitle">
          Choose from our premium vehicles with professional drivers for a
          comfortable and safe journey across Gilgit-Baltistan.
        </Typography>
      </Box>

      {loading ? (
        <Box className="loading-box">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="rentcar-container">
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <Card key={index} className="rentcar-card">
                <CardMedia
                  component="img"
                  image={
                    car.image
                      ? `http://localhost:8000/${car.image.replace(/\\/g, "/")}`
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={car.carName}
                  className="rentcar-image"
                />

                <CardContent className="rentcar-content">
                  <Typography variant="h6" className="rentcar-name">
                    {car.carName} ({car.modelYear})
                  </Typography>

                  <Typography variant="body2" className="rentcar-desc">
                    {car.description || "No description available."}
                  </Typography>

                  <Typography variant="body2" className="rentcar-info">
                    Capacity: {car.seats} Persons
                  </Typography>
                  <Typography variant="body2" className="rentcar-info">
                    Location: {car.location}
                  </Typography>
                  <Typography variant="body2" className="rentcar-info">
                    Status: {car.status}
                  </Typography>

                  <Typography variant="subtitle1" className="rentcar-price">
                    PKR {car.pricePerDay}/day
                  </Typography>

                  <Button
                    variant="success"
                    className="rentcar-btn"
                    onClick={() => handleBookNow(car)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography align="center" className="no-data">
              No cars available.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
