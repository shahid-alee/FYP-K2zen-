// src/components/rentCar.jsx
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
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function RentCar() {
  // tabs: 0 => Cars, 1 => Bookings
  const [tab, setTab] = useState(0);

  // Cars
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [openCarForm, setOpenCarForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [deletingCarId, setDeletingCarId] = useState(null);

  // Bookings
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [openBookingView, setOpenBookingView] = useState(false);
  const [deletingBookingId, setDeletingBookingId] = useState(null);

  // UI Messaging
  const [snack, setSnack] = useState({ open: false, severity: "success", message: "" });

  // API endpoints (single source)
  const API_BASE = "http://localhost:8000/api";
  const API_CAR = `${API_BASE}/rentcar`;
  const API_BOOKING = `${API_BASE}/carbooking`;

  useEffect(() => {
    fetchCars();
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* -------------------- Helpers -------------------- */
  const showSnack = (message, severity = "success") => {
    setSnack({ open: true, severity, message });
  };

  const closeSnack = () => setSnack(prev => ({ ...prev, open: false }));

  const safeArray = (x) => (Array.isArray(x) ? x : []);

  const safeDate = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d || "-";
    }
  };

  /* -------------------- Cars -------------------- */
  const fetchCars = async () => {
    setLoadingCars(true);
    try {
      const res = await axios.get(API_CAR);
      setCars(safeArray(res.data?.data ?? res.data?.cars ?? res.data));
    } catch (err) {
      console.error("Error fetching cars:", err);
      setCars([]);
      showSnack("Failed to load cars", "error");
    } finally {
      setLoadingCars(false);
    }
  };

  const handleDeleteCar = async (carId) => {
    const ok = window.confirm("Are you sure you want to delete this car?");
    if (!ok) return;
    try {
      setDeletingCarId(carId);
      await axios.delete(`${API_CAR}/${carId}`);
      showSnack("Car deleted", "success");
      setCars(prev => prev.filter(c => c._id !== carId));
    } catch (err) {
      console.error("Delete car error:", err);
      showSnack(err?.response?.data?.message || "Failed to delete car", "error");
    } finally {
      setDeletingCarId(null);
    }
  };

  /* -------------------- Bookings -------------------- */
  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await axios.get(API_BOOKING);
      setBookings(safeArray(res.data?.data ?? res.data?.bookings ?? res.data));
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
      showSnack("Failed to load bookings", "error");
    } finally {
      setLoadingBookings(false);
    }
  };

  const openBookingDetails = (b) => {
    setViewingBooking(b);
    setOpenBookingView(true);
  };

  // Approve booking
  const handleApprove = async (bookingId, setSubmitting) => {
    try {
      setSubmitting(true);
      const res = await axios.put(`${API_BOOKING}/approve/${bookingId}`);
      const msg = res?.data?.message ?? res?.data?.msg ?? "Booking approved";
      showSnack(msg, "success");
      setOpenBookingView(false);
      // Update local bookings state to reflect change (if backend returns updated booking you can merge)
      setBookings(prev => prev.map(b => (b._id === bookingId ? { ...b, status: "Booked" } : b)));
      fetchCars();
    } catch (err) {
      console.error("Approve error:", err);
      const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || err?.response?.data?.error;
      showSnack(serverMsg || "Failed to approve booking", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Reject booking (with optional reason)
  const handleReject = async (bookingId, reason, setSubmitting) => {
    try {
      setSubmitting(true);
      const res = await axios.put(`${API_BOOKING}/reject/${bookingId}`, { reason });
      const msg = res?.data?.message ?? res?.data?.msg ?? "Booking rejected";
      showSnack(msg, "info");
      setOpenBookingView(false);
      setBookings(prev => prev.map(b => (b._id === bookingId ? { ...b, status: "Rejected" } : b)));
      fetchCars();
    } catch (err) {
      console.error("Reject error:", err);
      const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || err?.response?.data?.error;
      showSnack(serverMsg || "Failed to reject booking", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete booking (fixed: expect id string)
  const handleDeleteBooking = async (id) => {
    if (!id) {
      console.warn("handleDeleteBooking called without id", id);
      return;
    }
    const ok = window.confirm("Are you sure you want to delete this booking?");
    if (!ok) return;

    try {
      setDeletingBookingId(id);
      const response = await axios.delete(`${API_BOOKING}/delete/${id}`);
      console.log("✅ Booking deleted:", response.data);

      // Optimistic UI update
      setBookings(prev => prev.filter(booking => booking._id !== id));
      showSnack("Booking deleted", "success");
    } catch (error) {
      console.error("❌ Delete booking error:", error);
      showSnack(error?.response?.data?.message || "Failed to delete booking", "error");
    } finally {
      setDeletingBookingId(null);
    }
  };

  const statusColor = (s) => {
    if (!s) return "gray";
    if (s.toLowerCase() === "pending") return "orange";
    if (s.toLowerCase() === "booked" || s.toLowerCase() === "confirmed") return "green";
    if (s.toLowerCase() === "rejected") return "red";
    return "gray";
  };

  /* -------------------- Car Form (add/edit) -------------------- */
  const carValidation = Yup.object({
    carName: Yup.string().required("Required"),
    modelYear: Yup.number().required("Required"),
    pricePerDay: Yup.number().required("Required"),
    seats: Yup.number().required("Required"),
    location: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const handleCarSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const formData = new FormData();
      Object.keys(values).forEach((k) => {
        if (values[k] !== undefined && values[k] !== null) formData.append(k, values[k]);
      });
      if (editingCar && editingCar._id) {
        await axios.put(`${API_CAR}/${editingCar._id}`, formData);
        showSnack("Car updated", "success");
      } else {
        await axios.post(`${API_CAR}/add`, formData);
        showSnack("Car added", "success");
      }
      resetForm();
      setOpenCarForm(false);
      setEditingCar(null);
      fetchCars();
    } catch (err) {
      console.error("Save car error:", err);
      showSnack(err?.response?.data?.message || "Failed to save car", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>Admin: Cars & Bookings</Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Cars" />
        <Tab label="Bookings" />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Button variant="contained" onClick={() => { setEditingCar(null); setOpenCarForm(true); }} sx={{ mb: 2 }}>Add New Car</Button>

          {loadingCars ? <CircularProgress /> : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Car Name</TableCell>
                    <TableCell>Model Year</TableCell>
                    <TableCell>Price/Day</TableCell>
                    <TableCell>Seats</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cars.length === 0 && (
                    <TableRow><TableCell colSpan={8} align="center">No cars</TableCell></TableRow>
                  )}
                  {cars.map(car => (
                    <TableRow key={car._id}>
                      <TableCell>{car.carName}</TableCell>
                      <TableCell>{car.modelYear}</TableCell>
                      <TableCell>{car.pricePerDay}</TableCell>
                      <TableCell>{car.seats}</TableCell>
                      <TableCell>{car.location}</TableCell>
                      <TableCell><b style={{ color: statusColor(car.status) }}>{car.status}</b></TableCell>
                      <TableCell>
                        <Avatar
                          src={`http://localhost:8000/${(car.image || "").toString().replace(/\\/g, "/")}`}
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => { setEditingCar(car); setOpenCarForm(true); }}>
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => handleDeleteCar(car._id)}
                          disabled={deletingCarId === car._id}
                        >
                          {deletingCarId === car._id ? <CircularProgress size={20} /> : <DeleteIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Car Add/Edit Dialog */}
          <Dialog open={openCarForm} onClose={() => setOpenCarForm(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{editingCar ? "Edit Car" : "Add Car"}</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={editingCar || {
                  carName: "", modelYear: "", pricePerDay: "", seats: "", location: "", status: "Available", description: "", image: null
                }}
                validationSchema={carValidation}
                enableReinitialize
                onSubmit={handleCarSubmit}
              >
                {({ setFieldValue, values, handleChange, isSubmitting }) => (
                  <Form style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
                    <TextField label="Car Name" name="carName" value={values.carName} onChange={handleChange} fullWidth />
                    <TextField label="Model Year" name="modelYear" type="number" value={values.modelYear} onChange={handleChange} fullWidth />
                    <TextField label="Price Per Day" name="pricePerDay" type="number" value={values.pricePerDay} onChange={handleChange} fullWidth />
                    <TextField label="Seats" name="seats" type="number" value={values.seats} onChange={handleChange} fullWidth />
                    <TextField label="Location" name="location" value={values.location} onChange={handleChange} fullWidth />
                    <TextField label="Description" name="description" multiline rows={3} value={values.description} onChange={handleChange} fullWidth />
                    <input type="file" onChange={(e) => setFieldValue("image", e.currentTarget.files[0])} />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button type="submit" variant="contained" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
                      <Button onClick={() => { setOpenCarForm(false); setEditingCar(null); }} disabled={isSubmitting}>Cancel</Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>All Bookings</Typography>
          {loadingBookings ? <CircularProgress /> : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Renter</TableCell>
                    <TableCell>Car</TableCell>
                    <TableCell>Check-in</TableCell>
                    <TableCell>Check-out</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.length === 0 && (
                    <TableRow><TableCell colSpan={8} align="center">No bookings</TableCell></TableRow>
                  )}
                  {bookings.map((b, i) => (
                    <TableRow key={b._id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <div>{b.userName}</div>
                        <div style={{ fontSize: 12, color: "#666" }}>{b.email}</div>
                      </TableCell>
                      <TableCell>{b.carName}</TableCell>
                      <TableCell>{new Date(b.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(b.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>PKR {b.totalPrice}</TableCell>
                      <TableCell><b style={{ color: statusColor(b.status) }}>{b.status}</b></TableCell>
                      <TableCell>
                        <IconButton onClick={() => openBookingDetails(b)}><VisibilityIcon /></IconButton>

                        <IconButton
                          color="error"
                          onClick={() => handleDeleteBooking(b._id)} // <-- pass only id (fix)
                          disabled={deletingBookingId === b._id}
                        >
                          {deletingBookingId === b._id ? <CircularProgress size={20} /> : <DeleteIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Booking Details Modal */}
          <Dialog open={openBookingView} onClose={() => setOpenBookingView(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogContent>
              {viewingBooking ? (
                <Box sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1"><b>Renter</b></Typography>
                      <Typography>{viewingBooking.userName}</Typography>
                      <Typography variant="body2">{viewingBooking.email}</Typography>
                      <Typography variant="body2">{viewingBooking.contact}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1"><b>Car</b></Typography>
                      <Typography>{viewingBooking.carName} ({viewingBooking.modelYear})</Typography>
                      <Avatar
                        src={`http://localhost:8000/${(viewingBooking.image || "").toString().replace(/\\/g, "/")}`}
                        variant="rounded"
                        sx={{ width: 120, height: 80, mt: 1 }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2 }}>
                    <Typography><b>Check-in:</b> {safeDate(viewingBooking.startDate)}</Typography>
                    <Typography><b>Check-out:</b> {safeDate(viewingBooking.endDate)}</Typography>
                    <Typography><b>Days:</b> {viewingBooking.totalDays} &nbsp; <b>Total:</b> PKR {viewingBooking.totalPrice}</Typography>
                    <Typography sx={{ mt: 1 }}><b>Status:</b> <span style={{ color: statusColor(viewingBooking.status) }}>{viewingBooking.status}</span></Typography>
                  </Box>

                  {/* Approve / Reject */}
                  {viewingBooking.status === "Pending" ? (
                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <Formik initialValues={{}} onSubmit={(values, { setSubmitting }) => handleApprove(viewingBooking._id, setSubmitting)}>
                        {({ handleSubmit, isSubmitting }) => (
                          <Form onSubmit={handleSubmit}>
                            <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mr: 1 }}>
                              {isSubmitting ? "Processing..." : "Confirm & Email"}
                            </Button>
                          </Form>
                        )}
                      </Formik>

                      <Formik initialValues={{ reason: "" }} onSubmit={(values, { setSubmitting }) => handleReject(viewingBooking._id, values.reason, setSubmitting)}>
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
                  ) : (
                    <Box sx={{ mt: 2 }}>
                      <Typography><b>Note:</b> This booking has already been processed.</Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Typography>Loading...</Typography>
              )}
            </DialogContent>
          </Dialog>
        </Box>
      )}
      <Snackbar open={snack.open} autoHideDuration={4500} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
