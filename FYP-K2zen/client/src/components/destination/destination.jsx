import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import "./destination.scss";

export default function Destination() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/destinations");
        setDestinations(res.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchTours();
  }, []);

  return (
    <Box className="destination-page">
      <Typography variant="h4" className="destination-title">
        Explore Stunning Destinations
      </Typography>
      <Typography variant="h6" className="destination-subtitle">
        Discover breathtaking locations and plan your next adventure.
      </Typography>

      <Box className="destination-container">
        {destinations.length > 0 ? (
          destinations.map((item, index) => (
            <Card key={index} className="destination-card">
              <CardMedia
                component="img"
                height="240"
                image={
                  item.image
                    ? `http://localhost:8000/${item.image.replace(/\\/g, "/")}`
                    : "https://via.placeholder.com/400x300"
                }
                alt={item.name}
                className="destination-image"
              />
              <CardContent className="destination-content">
                <Typography variant="h5" className="destination-name">
                  {item.name}
                </Typography>
                <Typography variant="body2" className="destination-description">
                  {item.description}
                </Typography>
                <Link
                  to="/viewDestination/packages"
                  state={{ destinationName: item.name }}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" className="view-btn">
                    View Packages
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography className="no-destination">No destinations found.</Typography>
        )}
      </Box>
    </Box>
  );
}
