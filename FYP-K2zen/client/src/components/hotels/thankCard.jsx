import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const ThankCard = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          borderRadius: 4,
          boxShadow: 6,
          textAlign: "center",
          p: 3,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: "green", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Booking Confirmed 🎉
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, fontStyle: "italic" }}
          >
            Thank you for choosing <b>K2zen</b>!  
            Your booking has been successfully completed.  
            We can’t wait to welcome you and make your stay unforgettable! 💙
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            “A journey well planned is a memory well made.” ✈️
          </Typography>

          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "",
            }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThankCard;
