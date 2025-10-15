import React, { useState, useEffect } from "react";
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
import axios from "axios";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 0,
  });

  const API_URL = "http://localhost:8000/api/reviews";

  // ✅ Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(API_URL);
      setReviews(res.data);
    } catch (err) {
      console.error("❌ Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (_, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message || !formData.rating) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(API_URL, formData);
      setReviews([res.data, ...reviews]);
      setFormData({ name: "", message: "", rating: 0 });
    } catch (err) {
      console.error("❌ Error submitting review:", err);
      alert("Failed to submit review");
    }
  };

  return (
    <Box className="reviews-section">
      <Typography variant="h4" align="center" gutterBottom>
        Traveler Reviews
      </Typography>

      {/* Review Form */}
      <Paper elevation={4} className="review-form">
        <Typography variant="h6" gutterBottom>
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
              <Typography>Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="success" fullWidth>
                Submit Review
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Reviews Slider */}
      <Box className="reviews-slider">
        {reviews.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <Paper elevation={3} className="review-card">
                  <Avatar
                    src="/images/default-avatar.png"
                    alt={review.name}
                    className="review-avatar"
                  />
                  <Typography variant="h6">{review.name}</Typography>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="body2" className="review-message">
                    "{review.message}"
                  </Typography>
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Typography textAlign="center" mt={2}>
            No reviews yet. Be the first to share your experience!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
