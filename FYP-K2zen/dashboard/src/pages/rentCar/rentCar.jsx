import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Avatar, Button, Dialog, DialogTitle,
  DialogContent, CircularProgress, TextField, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RentCar = () => {
  const [cars, setCars] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [viewingCar, setViewingCar] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api/rentcar";

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const validationSchema = Yup.object({
    carName: Yup.string().required("Car name is required"),
    modelYear: Yup.number().required("Model year is required"),
    pricePerDay: Yup.number().required("Price per day is required"),
    seats: Yup.number().required("Seats are required"),
    location: Yup.string().required("Location is required"),
    status: Yup.string().required("Status is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    try {
      if (editingCar) {
        await axios.put(`${API_URL}/${editingCar._id}`, formData);
      } else {
        await axios.post(`${API_URL}/add`, formData);
      }
      fetchCars();
      resetForm();
      setOpenForm(false);
      setEditingCar(null);
    } catch (err) {
      console.error("Error saving car:", err);
    }
  };

  const handleDelete = async (car) => {
    try {
      await axios.delete(`${API_URL}/${car._id}`);
      fetchCars();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Rent Car Management
      </Typography>

      <Button
        variant="contained"
        onClick={() => { setEditingCar(null); setOpenForm(true); }}
        style={{ marginBottom: "20px" }}
      >
        Add New Car
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell><b>Car Name</b></TableCell>
                <TableCell><b>Model Year</b></TableCell>
                <TableCell><b>Price / Day</b></TableCell>
                <TableCell><b>Seats</b></TableCell>
                <TableCell><b>Location</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Image</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.length > 0 ? (
                cars.map(car => (
                  <TableRow key={car._id}>
                    <TableCell>{car.carName}</TableCell>
                    <TableCell>{car.modelYear}</TableCell>
                    <TableCell>{car.pricePerDay}</TableCell>
                    <TableCell>{car.seats}</TableCell>
                    <TableCell>{car.location}</TableCell>
                    <TableCell>{car.status}</TableCell>
                    <TableCell>
                      <Avatar
                        src={`http://localhost:8000/${car.image.replace(/\\/g, "/")}`}
                        variant="rounded"
                        sx={{ width: 60, height: 60 }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => { setViewingCar(car); setOpenView(true); }}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => { setEditingCar(car); setOpenForm(true); }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(car)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={8}>No Cars Available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ✅ FORM DIALOG */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCar ? "Edit Car" : "Add New Car"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={editingCar || {
              carName: "",
              modelYear: "",
              pricePerDay: "",
              seats: "",
              location: "",
              status: "",
              description: "",
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form style={{ display: "flex", flexDirection: "column", gap: 15, marginTop: 10 }}>

                {/* ✅ Car Name */}
                <TextField
                  label="Car Name"
                  name="carName"
                  onChange={(e) => setFieldValue("carName", e.target.value)}
                  defaultValue={editingCar?.carName}
                  fullWidth
                />
                <ErrorMessage name="carName" component="div" style={{ color: "red" }} />

                {/* ✅ Model Year */}
                <TextField
                  label="Model Year"
                  type="number"
                  fullWidth
                  name="modelYear"
                  onChange={(e) => setFieldValue("modelYear", e.target.value)}
                  defaultValue={editingCar?.modelYear}
                />
                <ErrorMessage name="modelYear" component="div" style={{ color: "red" }} />

                <TextField
                  label="Price Per Day"
                  type="number"
                  fullWidth
                  name="pricePerDay"
                  onChange={(e) => setFieldValue("pricePerDay", e.target.value)}
                  defaultValue={editingCar?.pricePerDay}
                />
                <ErrorMessage name="pricePerDay" component="div" style={{ color: "red" }} />

                {/* ✅ Seats */}
                <TextField
                  label="Seats"
                  type="number"
                  fullWidth
                  name="seats"
                  onChange={(e) => setFieldValue("seats", e.target.value)}
                  defaultValue={editingCar?.seats}
                />
                <ErrorMessage name="seats" component="div" style={{ color: "red" }} />

                {/* ✅ Location */}
                <TextField
                  label="Location"
                  fullWidth
                  name="location"
                  onChange={(e) => setFieldValue("location", e.target.value)}
                  defaultValue={editingCar?.location}
                />
                <ErrorMessage name="location" component="div" style={{ color: "red" }} />

                {/* ✅ Status Select */}
                <TextField
                  label="Status"
                  select
                  fullWidth
                  name="status"
                  defaultValue={editingCar?.status || ""}
                  onChange={(e) => setFieldValue("status", e.target.value)}
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Booked">Booked</MenuItem>
                  <MenuItem value="Maintenance">Maintenance</MenuItem>
                </TextField>
                <ErrorMessage name="status" component="div" style={{ color: "red" }} />

                {/* ✅ Description */}
                <TextField
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                  name="description"
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  defaultValue={editingCar?.description}
                />
                <ErrorMessage name="description" component="div" style={{ color: "red" }} />

                {/* ✅ File Input */}
                <input
                  type="file"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                  style={{ marginTop: "10px" }}
                />
                <ErrorMessage name="image" component="div" style={{ color: "red" }} />

                <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
                  {editingCar ? "Update Car" : "Add Car"}
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>


      {/* ✅ VIEW CAR DIALOG */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Car Details</DialogTitle>
        <DialogContent>
          {viewingCar && (
            <div style={{ padding: 10, lineHeight: 1.8 }}>
              <p><b>Car:</b> {viewingCar.carName}</p>
              <p><b>Model:</b> {viewingCar.modelYear}</p>
              <p><b>Price Per Day:</b> Rs. {viewingCar.pricePerDay}</p>
              <p><b>Seats:</b> {viewingCar.seats}</p>
              <p><b>Location:</b> {viewingCar.location}</p>
              <p><b>Status:</b> {viewingCar.status}</p>
              <p><b>Description:</b> {viewingCar.description}</p>
              <Avatar
                src={`http://localhost:8000/${viewingCar.image.replace(/\\/g, "/")}`}
                sx={{ width: 120, height: 120 }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default RentCar;
