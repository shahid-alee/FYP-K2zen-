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
import { useNavigate } from "react-router-dom";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    message: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({
    message: "",
    rating: "",
  });

  const navigate = useNavigate();
  const API_URL = "http://localhost:8000/api/reviews";

  const fetchReviews = async () => {
    try {
      const res = await axios.get(API_URL);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    let newErrors = {};
    if (!formData.message) newErrors.message = "Please write something!";
    if (!formData.rating) newErrors.rating = "Please give a rating!";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const reviewData = {
      name: loggedInUser.username || loggedInUser.name,
      email: loggedInUser.email,
      rating: formData.rating,
      message: formData.message,
    };

    try {
      const res = await axios.post(API_URL, reviewData);
      setReviews([res.data, ...reviews]);
      setFormData({ message: "", rating: 0 });
      setErrors({});
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <Box className="reviews-section">
      <div className="section-header">
        <h2 className="section-title">Traveler Reviews</h2>
        <p className="section-subtitle">
          Your experience matters — share your thoughts!
        </p>
      </div>

      <Paper elevation={4} className="review-form">
        <Typography variant="h6" className="form-title">
          Share Your Experience
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                label="Your Review"
                multiline
                rows={3}
                fullWidth
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  setErrors({ ...errors, message: "" });
                }}
                error={Boolean(errors.message)}
              />
              {errors.message && (
                <p className="error-text">{errors.message}</p>
              )}
            </Grid>

            {/* ✅ Rating Field */}
            <Grid item xs={12}>
              <Typography>Rating</Typography>
              <Rating
                value={formData.rating}
                onChange={(_, value) => {
                  setFormData({ ...formData, rating: value });
                  setErrors({ ...errors, rating: "" });
                }}
              />
              {errors.rating && (
                <p className="error-text">{errors.rating}</p>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="review-button"
              >
                Submit Review
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>

      {/* Slider */}
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
