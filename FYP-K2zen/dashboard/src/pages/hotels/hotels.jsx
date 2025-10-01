import React, { useState } from "react";
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
  TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const Hotels = () => {
  // Dummy data
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Grand Palace Hotel",
      description: "Luxury hotel in the city center",
      location: "Karachi, Pakistan",
      image: "",
      status: "Available",
    },
    {
      id: 2,
      name: "Mountain View Inn",
      description: "Cozy hotel near the mountains",
      location: "Murree, Pakistan",
      image: "",
      status: "Booked",
    },
  ]);

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    image: "",
    status: "",
  });

  // Handlers
  const handleView = (hotel) => {
    setSelectedHotel(hotel);
    setOpenView(true);
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setFormData(hotel);
    setOpenEdit(true);
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      description: "",
      location: "",
      image: "",
      status: "",
    });
    setOpenAdd(true);
  };

  const handleSaveEdit = () => {
    setHotels(
      hotels.map((h) => (h.id === selectedHotel.id ? { ...formData, id: h.id } : h))
    );
    setOpenEdit(false);
  };

  const handleSaveAdd = () => {
    const newHotel = { ...formData, id: hotels.length + 1 };
    setHotels([...hotels, newHotel]);
    setOpenAdd(false);
  };

  const handleDelete = (hotel) => {
    setHotels(hotels.filter((h) => h.id !== hotel.id));
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
                <TableRow key={hotel.id}>
                  <TableCell>{hotel.name}</TableCell>
                  <TableCell>{hotel.description}</TableCell>
                  <TableCell>{hotel.location}</TableCell>
                  <TableCell>
                    <Avatar
                      src={hotel.image}
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
                src={selectedHotel.image}
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

      {/* Edit Modal */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Hotel</DialogTitle>
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
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Modal */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Hotel</DialogTitle>
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
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleSaveAdd} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Hotels;
