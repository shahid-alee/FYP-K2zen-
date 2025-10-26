import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./hotels.scss";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:8000/api/hotels";

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_URL);
        setHotels(res.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  // ✅ Navigate to Hotel Booking Page
  const handleBookNow = (hotel) => {
    navigate("/hotelbooking", { state: { hotel } });
  };

  return (
    <Box className="hotels-section">
      <div className="section-header">
        <Typography variant="h3" className="section-title">
          Hotel Booking
        </Typography>
        <Typography className="section-subtitle">
          Discover comfort and luxury in the finest hotels across Gilgit-Baltistan.  
          Book your stay with ease and enjoy your trip.
        </Typography>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className="hotel-row">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <Card className="hotel-card" key={hotel._id}>
                <div className="hotel-image">
                  <img
                    src={`http://localhost:8000/${hotel.image?.replace(/\\/g, "/")}`}
                    alt={hotel.name}
                  />
                </div>

                <CardContent className="hotel-content">
                  <Typography variant="h6" className="hotel-title">
                    {hotel.name}
                  </Typography>
                  <Typography className="hotel-details">
                    Location: {hotel.location}
                  </Typography>
                  <Typography className="hotel-details">
                    Status: {hotel.status}
                  </Typography>
                  <Typography className="hotel-price">
                    💲 Price: {hotel.price || "20$ - 50$"}
                  </Typography>
                  <Typography className="hotel-desc">
                    {hotel.description || "No description available."}
                  </Typography>

                  <Button
                    className="hotel-btn"
                    onClick={() => handleBookNow(hotel)}
                    disabled={hotel.status !== "Available"}
                  >
                    {hotel.status === "Available" ? "Book Now" : "Not Available"}
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography align="center" variant="h6">
              No hotels available.
            </Typography>
          )}
        </div>
      )}
    </Box>
  );
}
