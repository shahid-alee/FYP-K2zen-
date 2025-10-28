// src/components/destination/viewDetails/ViewDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import "./viewDetails.scss";

export default function ViewDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [pkg, setPkg] = useState(null);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/packages/${id}`)
        .then((res) => setPkg(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleBookNow = async () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      navigate("/login", {
        state: { next: `/viewDetails/${id}`, bookingIntent: { packageId: id } },
      });
      return;
    }

    const user = JSON.parse(userStr);

    const payload = {
      packageId: pkg._id,
      packageName: pkg.title,
      packagePrice: pkg.price,
      packageDays: pkg.days,
      destinationName: pkg.destinationName,
      userContact: user.phone || "",
      bookingDate: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/packageBookings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      alert("🎉 Booking successful!");
      navigate("/dashboard/packageBookings");
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Booking failed. Try again later.");
    }
  };

  if (!pkg)
    return <Typography variant="h6" align="center" sx={{ mt: 10 }}>Loading...</Typography>;

  const imageUrl = pkg.image
    ? `http://localhost:8000/${pkg.image.replace(/\\/g, "/")}`
    : "https://via.placeholder.com/1200x600";

  return (
    <Box className="view-details">
      <Box className="hero-section" style={{ backgroundImage: `url(${imageUrl})` }}>
        <Box className="overlay">
          <Typography variant="h3">{pkg.title}</Typography>
          <Typography variant="subtitle1">{pkg.destinationName}</Typography>
        </Box>
      </Box>

      <Box className="content-section">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
              <Tab label="Overview" />
              <Tab label="Itinerary" />
              <Tab label="Services" />
            </Tabs>
            <Divider sx={{ my: 2 }} />

            {tab === 0 && (
              <Box>
                <Typography variant="h6">Overview</Typography>
                <Typography>{pkg.description}</Typography>
              </Box>
            )}

            {tab === 1 && (
              <Box>
                <Typography variant="h6">Itinerary</Typography>
                {pkg.itinerary?.length
                  ? pkg.itinerary.map((d, i) => <li key={i}>{d}</li>)
                  : "No itinerary yet."}
              </Box>
            )}

            {tab === 2 && (
              <Box>
                <Typography variant="h6">Services</Typography>
                {pkg.services?.length
                  ? pkg.services.map((s, i) => <li key={i}>{s}</li>)
                  : "No services added."}
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia component="img" height="220" image={imageUrl} alt={pkg.title} />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">PKR {pkg.price}</Typography>
                <Typography>Duration: {pkg.days} Days</Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleBookNow}
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Now"}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
