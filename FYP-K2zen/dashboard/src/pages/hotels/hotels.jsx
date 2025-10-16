import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    image: null,
    status: "Available",
  });

  const API_URL = "http://localhost:8000/api/hotels"; // ✅ backend URL

  // Fetch hotels from backend
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get(API_URL);
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // Handlers
  const handleView = (hotel) => {
    setSelectedHotel(hotel);
    setOpenView(true);
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setFormData({
      name: hotel.name,
      description: hotel.description,
      location: hotel.location,
      image: null,
      status: hotel.status,
    });
    setOpenEdit(true);
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      description: "",
      location: "",
      image: null,
      status: "Available",
    });
    setOpenAdd(true);
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSaveAdd = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("status", formData.status);
      if (formData.image) data.append("image", formData.image);

      await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchHotels();
      setOpenAdd(false);
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("status", formData.status);
      if (formData.image) data.append("image", formData.image);

      await axios.put(`${API_URL}/${selectedHotel._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchHotels();
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const handleDelete = async (hotel) => {
    try {
      await axios.delete(`${API_URL}/${hotel._id}`);
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Hotels List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        style={{ marginBottom: "15px" }}
      >
        Add New Hotel
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Hotel Name</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <TableRow key={hotel._id}>
                  <TableCell>{hotel.name}</TableCell>
                  <TableCell>{hotel.description}</TableCell>
                  <TableCell>{hotel.location}</TableCell>
                  <TableCell>
                    <Avatar
                      src={`http://localhost:8000/${hotel.image}`}
                      alt={hotel.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{hotel.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleView(hotel)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleEdit(hotel)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(hotel)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Hotels Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Modal */}
      <Dialog open={openView} onClose={() => setOpenView(false)}>
        <DialogTitle>Hotel Details</DialogTitle>
        <DialogContent>
          {selectedHotel && (
            <div style={{ lineHeight: "1.8" }}>
              <p><b>Name:</b> {selectedHotel.name}</p>
              <p><b>Description:</b> {selectedHotel.description}</p>
              <p><b>Location:</b> {selectedHotel.location}</p>
              <p><b>Status:</b> {selectedHotel.status}</p>
              <Avatar
                src={`http://localhost:8000/${selectedHotel.image}`}
                alt={selectedHotel.name}
                variant="rounded"
                sx={{ width: 100, height: 100 }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add / Edit Dialog (shared UI) */}
      <Dialog open={openAdd || openEdit} onClose={() => { setOpenAdd(false); setOpenEdit(false); }}>
        <DialogTitle>{openAdd ? "Add New Hotel" : "Edit Hotel"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Hotel Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, mb: 1 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          <TextField
            margin="dense"
            select
            label="Status"
            fullWidth
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Booked">Booked</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenAdd(false); setOpenEdit(false); }}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={openAdd ? handleSaveAdd : handleSaveEdit}
          >
            {openAdd ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Hotels;
