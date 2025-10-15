import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const API_BASE = "http://localhost:8000/api/carbooking";

const CarBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_BASE);
      setBookings(res.data);
    } catch (err) {
      console.error("❌ Error fetching car bookings:", err);
    }
  };

  const handleView = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`${API_BASE}/${item._id}`);
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
         Car Bookings
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Contact</b></TableCell>
              <TableCell><b>Car</b></TableCell>
              <TableCell><b>Model</b></TableCell>
              <TableCell><b>Total Days</b></TableCell>
              <TableCell><b>Total Price ($)</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>{b.name}</TableCell>
                  <TableCell>{b.email}</TableCell>
                  <TableCell>{b.contact}</TableCell>
                  <TableCell>{b.carName}</TableCell>
                  <TableCell>{b.model}</TableCell>
                  <TableCell>{b.totalDays}</TableCell>
                  <TableCell>{b.totalPrice}</TableCell>
                  <TableCell>
                    <Chip
                      label={b.status || "Pending"}
                      color={
                        b.status === "Confirmed"
                          ? "success"
                          : b.status === "Cancelled"
                          ? "error"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleView(b)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(b)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No Car Bookings
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Booking Details Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Car Booking Details</DialogTitle>
        <Divider />
        <DialogContent>
          {selected && (
            <Box sx={{ lineHeight: 1.8, mt: 1 }}>
              <Typography><b>Name:</b> {selected.name}</Typography>
              <Typography><b>Email:</b> {selected.email}</Typography>
              <Typography><b>Contact:</b> {selected.contact}</Typography>
              <Typography><b>Car:</b> {selected.carName}</Typography>
              <Typography><b>Model:</b> {selected.model}</Typography>
              <Typography><b>Total Days:</b> {selected.totalDays}</Typography>
              <Typography><b>Total Price:</b> ${selected.totalPrice}</Typography>
              <Typography>
                <b>Status:</b>{" "}
                <Chip
                  label={selected.status || "Pending"}
                  color={selected.status === "Confirmed" ? "success" : "warning"}
                  size="small"
                />
              </Typography>
              <Typography>
                <b>Booked On:</b> {new Date(selected.createdAt).toLocaleDateString()}
              </Typography>
              {selected.image && (
                <Avatar
                  src={`http://localhost:8000/${selected.image}`}
                  variant="rounded"
                  sx={{ width: 120, height: 120, mt: 2 }}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarBookings;
