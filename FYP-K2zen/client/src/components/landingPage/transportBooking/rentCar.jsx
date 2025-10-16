import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
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

  // Navigate to Car Booking Page
  const handleBookNow = (car) => {
    navigate("/carbooking", { state: { car } });
  };

  return (
    <Box className="transport-section">
      <div className="section-header">
        <Typography variant="h3" className="section-title">
          Transport Booking
        </Typography>
        <Typography className="section-subtitle">
          Choose from our premium vehicles with professional drivers for a
          comfortable and safe journey across Gilgit-Baltistan.
        </Typography>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className="car-row">
          {cars.length > 0 ? (
            cars.map((car) => (
              <Card className="transport-card" key={car._id}>
                <div className="car-image">
                  <img
                    src={`http://localhost:8000/${car.image.replace(/\\/g, "/")}`}
                    alt={car.carName}
                  />
                </div>

                <CardContent className="car-content">
                  <Typography variant="h6" className="car-title">
                    {car.carName} ({car.modelYear})
                  </Typography>
                  <Typography className="car-details">
                    Capacity: {car.seats} Persons
                  </Typography>
                  <Typography className="car-details">
                    Location: {car.location}
                  </Typography>
                  <Typography className="car-details">
                    Status: {car.status}
                  </Typography>
                  <Typography className="car-price">
                    PKR {car.pricePerDay}/day
                  </Typography>
                  <Typography className="car-desc">{car.description}</Typography>
                  <Button
                    className="car-btn"
                    onClick={() => handleBookNow(car)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography align="center" variant="h6">
              No cars available.
            </Typography>
          )}
        </div>
      )}
    </Box>
  );
}
