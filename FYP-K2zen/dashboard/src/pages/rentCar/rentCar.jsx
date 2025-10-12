import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Avatar, Button, Dialog, DialogTitle,
  DialogContent, CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Formik, Field, Form, ErrorMessage } from "formik";
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

  // ✅ Validation schema based on your backend
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
    Object.keys(values).forEach((key) => {
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
        color="primary"
        onClick={() => {
          setEditingCar(null);
          setOpenForm(true);
        }}
        style={{ marginBottom: "20px" }}
      >
        Add New Car
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
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
                cars.map((car) => (
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
                        alt={car.carName}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => { setViewingCar(car); setOpenView(true); }}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => { setEditingCar(car); setOpenForm(true); }}>
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
                  <TableCell colSpan={8} align="center">
                    No Cars Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Form Dialog */}
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
            {({ setFieldValue, isSubmitting }) => (
              <Form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Field name="carName" type="text" placeholder="Car Name" />
                <ErrorMessage name="carName" component="div" style={{ color: "red" }} />

                <Field name="modelYear" type="number" placeholder="Model Year" />
                <ErrorMessage name="modelYear" component="div" style={{ color: "red" }} />

                <Field name="pricePerDay" type="number" placeholder="Price per Day" />
                <ErrorMessage name="pricePerDay" component="div" style={{ color: "red" }} />

                <Field name="seats" type="number" placeholder="Seats" />
                <ErrorMessage name="seats" component="div" style={{ color: "red" }} />

                <Field name="location" type="text" placeholder="Location" />
                <ErrorMessage name="location" component="div" style={{ color: "red" }} />

                <Field name="status" as="select">
                  <option value="">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintenance">Maintenance</option>
                </Field>
                <ErrorMessage name="status" component="div" style={{ color: "red" }} />

                <Field name="description" as="textarea" rows="3" placeholder="Description" />
                <ErrorMessage name="description" component="div" style={{ color: "red" }} />

                <div>
                  <label><b>Image</b></label>
                  <input type="file" onChange={(e) => setFieldValue("image", e.target.files[0])} />
                </div>

                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  {editingCar ? "Update Car" : "Add Car"}
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Car Details</DialogTitle>
        <DialogContent>
          {viewingCar && (
            <div style={{ padding: "10px", lineHeight: "1.8" }}>
              <p><b>Car Name:</b> {viewingCar.carName}</p>
              <p><b>Model Year:</b> {viewingCar.modelYear}</p>
              <p><b>Price per Day:</b> {viewingCar.pricePerDay}</p>
              <p><b>Seats:</b> {viewingCar.seats}</p>
              <p><b>Location:</b> {viewingCar.location}</p>
              <p><b>Status:</b> {viewingCar.status}</p>
              <p><b>Description:</b> {viewingCar.description}</p>
              <Avatar
                src={`http://localhost:8000/${viewingCar.image.replace(/\\/g, "/")}`}
                sx={{ width: 100, height: 100 }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentCar;
