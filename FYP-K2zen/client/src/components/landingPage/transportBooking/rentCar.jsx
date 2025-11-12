import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
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
        console.log("Fetched Cars:", res.data);

        const data =
          res.data.cars ||
          res.data.data ||
          res.data.allCars ||
          res.data ||
          [];

        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching rent cars:", error);
        setCars([]);
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
          Choose from our premium vehicles with professional drivers.
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
                      : car.images && car.images.length > 0
                      ? `http://localhost:8000/${car.images[0].replace(/\\/g, "/")}`
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={car.carName || car.name || "Car"}
                  className="rentcar-image"
                />

                <CardContent className="rentcar-content">
                  <Typography variant="h6" className="rentcar-name">
                    {car.carName || car.name}{" "}
                    {car.modelYear ? `(${car.modelYear})` : ""}
                  </Typography>

                  <Typography variant="body2" className="rentcar-desc">
                    {car.description || "No description available."}
                  </Typography>

                  <Typography variant="body2" className="rentcar-info">
                    Capacity: {car.seats || "N/A"} Persons
                  </Typography>

                  <Typography variant="body2" className="rentcar-info">
                    Location: {car.location || "Not Specified"}
                  </Typography>

                  <Typography variant="body2" className="rentcar-info">
                    Status: {car.status || "Available"}
                  </Typography>

                  <Typography variant="subtitle1" className="rentcar-price">
                    PKR {(car.pricePerDay || car.price || car.rent)}/day
                  </Typography>

                  <Button
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
