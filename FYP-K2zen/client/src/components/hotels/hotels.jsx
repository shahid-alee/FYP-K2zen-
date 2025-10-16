import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./hotels.scss";

export default function Hotels() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:8000/api/hotels";

  // ✅ Fetch hotels from backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(API_URL);
        setHotels(res.data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError("Failed to load hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const handleBookHotel = (hotel) => {
    navigate("/hotelbooking", { state: { hotel } });
  };

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
        <Typography>Loading hotels...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box className="hotels-section">
      <Typography variant="h3" className="section-title" gutterBottom>
        Featured Hotels
      </Typography>

      <Grid container spacing={4} className="card-container">
        <div className="card-box">
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <Grid item xs={12} key={hotel._id}>
                <Card
                  className={`hotel-card ${index % 2 === 0 ? "reverse" : ""}`}
                >
                  {/* Hotel Image */}
                  <CardMedia
                    component="img"
                    image={`http://localhost:8000/${hotel.image?.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={hotel.name}
                    className="hotel-image"
                  />

                  {/* Hotel Details */}
                  <CardContent className="hotel-content">
                    <Typography variant="h5" className="hotel-name">
                      {hotel.name}
                    </Typography>

                    <Typography className="hotel-location">
                      📍 {hotel.location}
                    </Typography>

                    <Typography className="hotel-description">
                      {hotel.description || "No description available."}
                    </Typography>

                    {/* ✅ Hotel Price */}
                    <Typography className="hotel-price">
                      💲 Price: {hotel.price || "20$ - 50$"}
                    </Typography>

                    <Typography
                      className={`hotel-status ${
                        hotel.status === "Available"
                          ? "available"
                          : "unavailable"
                      }`}
                    >
                      Status: {hotel.status}
                    </Typography>

                    <Button
                      variant="contained"
                      className="hotel-btn"
                      onClick={() => handleBookHotel(hotel)}
                      disabled={hotel.status !== "Available"}
                    >
                      {hotel.status === "Available"
                        ? "Explore & Book"
                        : "Not Available"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ width: "100%" }}>
              No Hotels Available
            </Typography>
          )}
        </div>
      </Grid>
    </Box>
  );
}
