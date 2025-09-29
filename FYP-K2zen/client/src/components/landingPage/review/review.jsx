import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  Paper,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./review.scss";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      name: "Ali Khan",
      avatar: "/images/review1.jpg",
      rating: 5,
      message:
        "The Skardu tour was absolutely amazing! The arrangements were perfect and the guides were very friendly.",
    },
    {
      name: "Sarah Ahmed",
      avatar: "/images/review2.jpg",
      rating: 4,
      message:
        "Beautiful experience in Hunza! Everything was well organized, and the hotel stays were very comfortable.",
    },
    {
      name: "John Smith",
      avatar: "/images/review3.jpg",
      rating: 5,
      message:
        "One of the best trips I have ever had. The mountains, the lakes, the culture—everything was breathtaking!",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (_, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rating || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    setReviews([{ ...formData, avatar: "/images/default-avatar.png" }, ...reviews]);
    setFormData({ name: "", rating: 0, message: "" });
  };

  return (
    <Box className="reviews-section">
      {/* Title */}
      <div className="section-header">
        <Typography variant="h4" className="reviews-title" gutterBottom>
          Traveler Reviews
        </Typography>
      </div>

      {/* Review Form */}
      <Paper elevation={4} className="review-form">
        <Typography variant="h6" className="form-title">
          Share Your Experience
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Review"
                name="message"
                multiline
                rows={3}
                fullWidth
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="legend">Your Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
              />
            </Grid>
            <Grid item xs={12} className= "review-button">
              <Button type="submit" variant="contained"  fullWidth className="review-button">
                Submit Review
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Reviews Slider */}
      <Box className="reviews-slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <Paper elevation={3} className="review-card">
                <Avatar
                  src={review.avatar}
                  alt={review.name}
                  className="review-avatar"
                />
                <Typography variant="h6" className="review-name">
                  {review.name}
                </Typography>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body2" className="review-message">
                  "{review.message}"
                </Typography>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
