// src/components/hotelDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Grid, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Avatar, IconButton, Dialog,
  DialogTitle, DialogContent, CircularProgress, Tabs, Tab, TextField,
  Snackbar, Alert
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function HotelDashboard() {
  const [tab, setTab] = useState(0);

  // Hotels
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [openHotelForm, setOpenHotelForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [deletingHotelId, setDeletingHotelId] = useState(null);

  // Bookings
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [openBookingView, setOpenBookingView] = useState(false);
  const [deletingBookingId, setDeletingBookingId] = useState(null);

  // Snackbar
  const [snack, setSnack] = useState({ open: false, severity: "success", message: "" });
  const showSnack = (message, severity = "success") => setSnack({ open: true, message, severity });
  const closeSnack = () => setSnack(prev => ({ ...prev, open: false }));

  // APIs
  const API_BASE = "http://localhost:8000/api";
  const API_HOTEL = `${API_BASE}/hotels`;
  const API_BOOKING = `${API_BASE}/bookings/hotels`;

  useEffect(() => {
    fetchHotels();
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* -------------------- Helpers -------------------- */
  const safeDate = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d || "-";
    }
  };

  const statusColor = (s) => {
    if (!s) return "gray";
    if (s.toLowerCase() === "pending") return "orange";
    if (s.toLowerCase() === "booked" || s.toLowerCase() === "confirmed") return "green";
    if (s.toLowerCase() === "rejected") return "red";
    return "gray";
  };

  /* -------------------- Hotels -------------------- */
  const fetchHotels = async () => {
    setLoadingHotels(true);
    try {
      const res = await axios.get(API_HOTEL);
      setHotels(res.data ?? []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      showSnack("Failed to fetch hotels", "error");
      setHotels([]);
    } finally {
      setLoadingHotels(false);
    }
  };

  const handleDeleteHotel = async (id) => {
    if (!id) return;
    const ok = window.confirm("Are you sure you want to delete this hotel?");
    if (!ok) return;
    try {
      setDeletingHotelId(id);
      await axios.delete(`${API_HOTEL}/${id}`);
      showSnack("Hotel deleted", "success");
      setHotels(prev => prev.filter(h => h._id !== id));
    } catch (err) {
      console.error(err);
      showSnack("Failed to delete hotel", "error");
    } finally {
      setDeletingHotelId(null);
    }
  };

  const hotelValidation = Yup.object({
    name: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const handleHotelSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const formData = new FormData();
      Object.keys(values).forEach(k => {
        if (values[k] !== undefined && values[k] !== null) formData.append(k, values[k]);
      });
      if (editingHotel && editingHotel._id) {
        await axios.put(`${API_HOTEL}/${editingHotel._id}`, formData);
        showSnack("Hotel updated", "success");
      } else {
        await axios.post(`${API_HOTEL}/add`, formData);
        showSnack("Hotel added", "success");
      }
      resetForm();
      setEditingHotel(null);
      setOpenHotelForm(false);
      fetchHotels();
    } catch (err) {
      console.error("Hotel save error:", err);
      showSnack("Failed to save hotel", "error");
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------- Bookings -------------------- */
  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await axios.get(API_BOOKING);
      setBookings(res.data ?? []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      showSnack("Failed to fetch bookings", "error");
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  };

  const openBookingDetails = (b) => {
    setViewingBooking(b);
    setOpenBookingView(true);
  };

  const handleDeleteBooking = async (id) => {
    if (!id) return;
    const ok = window.confirm("Are you sure you want to delete this booking?");
    if (!ok) return;
    try {
      setDeletingBookingId(id);
      await axios.delete(`${API_BOOKING}/delete/${id}`);
      setBookings(prev => prev.filter(b => b._id !== id));
      showSnack("Booking deleted", "success");
    } catch (err) {
      console.error(err);
      showSnack("Failed to delete booking", "error");
    } finally {
      setDeletingBookingId(null);
    }
  };

  // ✅ Updated Confirm Booking
  const handleConfirmBooking = async (id, setSubmitting) => {
    try {
      setSubmitting(true);
      await axios.put(`${API_BOOKING}/confirm/${id}`); // <-- updated endpoint
      showSnack("Booking confirmed", "success");
      setOpenBookingView(false);
      setBookings(prev => prev.map(b => (b._id === id ? { ...b, status: "Booked" } : b)));
      fetchHotels();
    } catch (err) {
      console.error(err);
      showSnack(err?.response?.data?.message || "Failed to confirm booking", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Updated Reject Booking
  const handleRejectBooking = async (id, reason, setSubmitting) => {
    try {
      setSubmitting(true);
      await axios.put(`${API_BOOKING}/reject/${id}`, { reason }); // <-- updated endpoint
      showSnack("Booking rejected", "info");
      setOpenBookingView(false);
      setBookings(prev => prev.map(b => (b._id === id ? { ...b, status: "Rejected" } : b)));
      fetchHotels();
    } catch (err) {
      console.error(err);
      showSnack(err?.response?.data?.message || "Failed to reject booking", "error");
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------- Render -------------------- */
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Hotel Admin Dashboard</Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Hotels" />
        <Tab label="Bookings" />
      </Tabs>

      {/* -------------------- Hotels Tab -------------------- */}
      {tab === 0 && (
        <Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => { setEditingHotel(null); setOpenHotelForm(true); }}>
            Add New Hotel
          </Button>

          {loadingHotels ? <CircularProgress /> : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hotels.length === 0 && <TableRow><TableCell colSpan={6} align="center">No hotels</TableCell></TableRow>}
                  {hotels.map(h => (
                    <TableRow key={h._id}>
                      <TableCell>{h.name}</TableCell>
                      <TableCell>{h.description}</TableCell>
                      <TableCell>{h.location}</TableCell>
                      <TableCell><b style={{ color: statusColor(h.status) }}>{h.status}</b></TableCell>
                      <TableCell>
                        {h.image && <Avatar src={`http://localhost:8000/${h.image}`} variant="rounded" sx={{ width: 60, height: 60 }} />}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => { setEditingHotel(h); setOpenHotelForm(true); }}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteHotel(h._id)} disabled={deletingHotelId === h._id}>
                          {deletingHotelId === h._id ? <CircularProgress size={20} /> : <DeleteIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Hotel Form */}
          <Dialog open={openHotelForm} onClose={() => setOpenHotelForm(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{editingHotel ? "Edit Hotel" : "Add Hotel"}</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={editingHotel || { name: "", description: "", location: "", status: "Available", image: null }}
                validationSchema={hotelValidation}
                enableReinitialize
                onSubmit={handleHotelSubmit}
              >
                {({ setFieldValue, values, handleChange, isSubmitting }) => (
                  <Form style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
                    <TextField label="Name" name="name" value={values.name} onChange={handleChange} fullWidth />
                    <TextField label="Description" name="description" value={values.description} onChange={handleChange} fullWidth />
                    <TextField label="Location" name="location" value={values.location} onChange={handleChange} fullWidth />
                    <TextField select label="Status" name="status" value={values.status} onChange={handleChange} fullWidth>
                      <option value="Available">Available</option>
                      <option value="Booked">Booked</option>
                    </TextField>
                    <input type="file" onChange={e => setFieldValue("image", e.currentTarget.files[0])} />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button type="submit" variant="contained" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
                      <Button onClick={() => setOpenHotelForm(false)} disabled={isSubmitting}>Cancel</Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </Box>
      )}

      {/* -------------------- Bookings Tab -------------------- */}
      {tab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>All Hotel Bookings</Typography>
          {loadingBookings ? <CircularProgress /> : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Guest</TableCell>
                    <TableCell>Hotel</TableCell>
                    <TableCell>Check-in</TableCell>
                    <TableCell>Check-out</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.length === 0 && <TableRow><TableCell colSpan={8} align="center">No bookings</TableCell></TableRow>}
                  {bookings.map((b, i) => (
                    <TableRow key={b._id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <div>{b.name}</div>
                        <div style={{ fontSize: 12, color: "#666" }}>{b.email}</div>
                        <div style={{ fontSize: 12, color: "#666" }}>{b.phone}</div>
                      </TableCell>
                      <TableCell>{b.hotelName}</TableCell>
                      <TableCell>{safeDate(b.checkIn)}</TableCell>
                      <TableCell>{safeDate(b.checkOut)}</TableCell>
                      <TableCell>${b.price}</TableCell>
                      <TableCell><b style={{ color: statusColor(b.status) }}>{b.status}</b></TableCell>
                      <TableCell>
                        <IconButton onClick={() => openBookingDetails(b)}><VisibilityIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteBooking(b._id)} disabled={deletingBookingId === b._id}>
                          {deletingBookingId === b._id ? <CircularProgress size={20} /> : <DeleteIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Booking Modal */}
          <Dialog open={openBookingView} onClose={() => setOpenBookingView(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogContent>
              {viewingBooking ? (
                <Box sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography><b>Guest Name:</b> {viewingBooking.name}</Typography>
                      <Typography><b>Email:</b> {viewingBooking.email}</Typography>
                      <Typography><b>Phone:</b> {viewingBooking.phone}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography><b>Hotel Name:</b> {viewingBooking.hotelName}</Typography>
                      {viewingBooking.image && (
                        <Avatar src={`http://localhost:8000/${viewingBooking.image}`} variant="rounded" sx={{ width: 120, height: 80, mt: 1 }} />
                      )}
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2 }}>
                    <Typography><b>Check-in:</b> {safeDate(viewingBooking.checkIn)}</Typography>
                    <Typography><b>Check-out:</b> {safeDate(viewingBooking.checkOut)}</Typography>
                    <Typography><b>Price:</b> ${viewingBooking.price}</Typography>
                    <Typography sx={{ mt: 1 }}><b>Status:</b> <span style={{ color: statusColor(viewingBooking.status) }}>{viewingBooking.status}</span></Typography>
                  </Box>

                  {viewingBooking.status === "Pending" && (
                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <Formik initialValues={{}} onSubmit={(v, { setSubmitting }) => handleConfirmBooking(viewingBooking._id, setSubmitting)}>
                        {({ handleSubmit, isSubmitting }) => (
                          <Form onSubmit={handleSubmit}>
                            <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mr: 1 }}>
                              {isSubmitting ? "Processing..." : "Confirm & Email"}
                            </Button>
                          </Form>
                        )}
                      </Formik>

                      <Formik initialValues={{ reason: "" }} onSubmit={(v, { setSubmitting }) => handleRejectBooking(viewingBooking._id, v.reason, setSubmitting)}>
                        {({ values, handleChange, handleSubmit, isSubmitting }) => (
                          <Form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <TextField name="reason" value={values.reason} onChange={handleChange} placeholder="Rejection reason (optional)" size="small" />
                            <Button type="submit" variant="outlined" color="error" disabled={isSubmitting}>
                              {isSubmitting ? "Rejecting..." : "Reject"}
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </Box>
                  )}

                  {viewingBooking.status !== "Pending" && (
                    <Box sx={{ mt: 2 }}>
                      <Typography><b>Note:</b> This booking has already been processed.</Typography>
                    </Box>
                  )}
                </Box>
              ) : <CircularProgress />}
            </DialogContent>
          </Dialog>
        </Box>
      )}

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
