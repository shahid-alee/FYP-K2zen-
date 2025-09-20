import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import "./rentCar.scss";

import car1 from "../../../assets/cars/toyota carolla.jpeg";
import car2 from "../../../assets/cars/toyota prado.jpeg";
import van1 from "../../../assets/cars/hiace.jpeg";
import coaster from "../../../assets/cars/coaster.jpeg";

const transportOptions = [
  { type: "Toyota Corolla", persons: 4, price: "PKR 6,000/day", image: car1 },
  { type: "Toyota Prado", persons: 6, price: "PKR 12,000/day", image: car2 },
  { type: "Hiace Van", persons: 12, price: "PKR 15,000/day", image: van1 },
  { type: "Coaster", persons: 25, price: "PKR 25,000/day", image: coaster },
];

export default function TransportBooking() {
  return (
    <Box className="transport-section">
      {/* Section Heading */}
      <div className="section-header">
        <Typography variant="h3" className="section-title">
          Transport Booking
        </Typography>
        <Typography className="section-subtitle">
          Choose from our premium vehicles with professional drivers for a
          comfortable and safe journey across Gilgit-Baltistan.
        </Typography>
      </div>

      {/* Flex Row of Cars */}
      <div className="car-row">
        {transportOptions.map((car, index) => (
          <Card className="transport-card" key={index}>
            <div className="car-image">
              <img src={car.image} alt={car.type} />
            </div>
            <CardContent className="car-content">
              <Typography variant="h6" className="car-title">
                {car.type}
              </Typography>
              <Typography className="car-details">
                Capacity: {car.persons} Persons
              </Typography>
              <Typography className="car-price">{car.price}</Typography>
              <Button className="car-btn">Book Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
  );
}
