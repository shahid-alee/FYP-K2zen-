import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from "@mui/material";

export default function BookingsTable() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 5, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>All Bookings</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Package</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Days</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Booking Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b._id}>
              <TableCell>{b.userName}</TableCell>
              <TableCell>{b.userEmail}</TableCell>
              <TableCell>{b.userContact}</TableCell>
              <TableCell>{b.packageName}</TableCell>
              <TableCell>{b.packagePrice}</TableCell>
              <TableCell>{b.packageDays}</TableCell>
              <TableCell>{b.destinationName}</TableCell>
              <TableCell>{new Date(b.bookingDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
