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

const API_BASE = "http://localhost:8000/api/customizepackages";

const CustomPackagesDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(API_BASE);
      setPackages(res.data);
    } catch (err) {
      console.error(" Error fetching custom packages:", err);
    }
  };

  const handleView = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`${API_BASE}/${item._id}`);
      fetchPackages();
    } catch (err) {
      console.error(" Error deleting package:", err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
         Customized Tour Packages
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>People</b></TableCell>
              <TableCell><b>Duration (Days)</b></TableCell>
              <TableCell><b>Destinations</b></TableCell>
              <TableCell><b>Accommodation</b></TableCell>
              <TableCell><b>Transport</b></TableCell>
              <TableCell><b>Start Date</b></TableCell>
              <TableCell><b>Meals</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.length > 0 ? (
              packages.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.fullName}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell>{p.numberOfPeople}</TableCell>
                  <TableCell>{p.durationDays}</TableCell>
                  <TableCell>{p.destinationPlaces.join(", ")}</TableCell>
                  <TableCell>{p.accommodationType}</TableCell>
                  <TableCell>{p.transportType}</TableCell>
                  <TableCell>{p.startDate}</TableCell>
                  <TableCell>{p.mealsIncluded ? "Yes" : "No"}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleView(p)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(p)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No Customized Packages
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Customized Package Details</DialogTitle>
        <Divider />
        <DialogContent>
          {selected && (
            <Box sx={{ lineHeight: 1.8, mt: 1 }}>
              <Typography><b>Name:</b> {selected.fullName}</Typography>
              <Typography><b>Email:</b> {selected.email}</Typography>
              <Typography><b>Phone:</b> {selected.phone}</Typography>
              <Typography><b>Number of People:</b> {selected.numberOfPeople}</Typography>
              <Typography><b>Duration:</b> {selected.durationDays} Days</Typography>
              <Typography><b>Destinations:</b> {selected.destinationPlaces.join(", ")}</Typography>
              <Typography><b>Accommodation:</b> {selected.accommodationType}</Typography>
              <Typography><b>Transport:</b> {selected.transportType}</Typography>
              <Typography><b>Start Date:</b> {selected.startDate}</Typography>
              <Typography><b>Meals Included:</b> {selected.mealsIncluded ? "Yes" : "No"}</Typography>
              {selected.specialRequests && (
                <Typography><b>Special Requests:</b> {selected.specialRequests}</Typography>
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

export default CustomPackagesDashboard;
