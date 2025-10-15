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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const API_BASE = "http://localhost:8000/api/reviews";

export default function ReviewsDashboard() {
  const [reviews, setReviews] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(API_BASE);
      setReviews(res.data);
    } catch (err) {
      console.error("❌ Error fetching reviews:", err);
    }
  };

  const handleView = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`${API_BASE}/${item._id}`);
      fetchReviews(); // Refresh after delete
    } catch (err) {
      console.error(" Error deleting review:", err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
         Customer Reviews
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Customer Name</b></TableCell>
              <TableCell><b>Review</b></TableCell>
              <TableCell><b>Rating</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.name}</TableCell> {/* ✅ fixed */}
                  <TableCell>{r.message}</TableCell> {/* ✅ fixed */}
                  <TableCell>
                    <Rating value={r.rating} precision={0.5} readOnly />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleView(r)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(r)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Reviews Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Review Details Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent>
          {selected && (
            <Box sx={{ mt: 1, lineHeight: 1.8 }}>
              <Typography><b>Customer:</b> {selected.name}</Typography> {/* ✅ fixed */}
              <Typography><b>Review:</b> {selected.message}</Typography> {/* ✅ fixed */}
              <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <b>Rating:</b>
                <Rating value={selected.rating} precision={0.5} readOnly />
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
