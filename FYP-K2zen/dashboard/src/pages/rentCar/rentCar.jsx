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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const RentCar = () => {
  const [cars, setCars] = useState([
    {
      _id: 1,
      carName: "Toyota Corolla",
      model: "2020",
      description: "Comfortable sedan for family trips.",
      driverName: "Ali Khan",
      location: "Islamabad",
      image: "https://via.placeholder.com/100",
      status: "Available",
    },
    {
      _id: 2,
      carName: "Honda Civic",
      model: "2019",
      description: "Stylish car with smooth drive.",
      driverName: "Ahmed Raza",
      location: "Lahore",
      image: "https://via.placeholder.com/100",
      status: "Booked",
    },
  ]);

  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [viewingCar, setViewingCar] = useState(null);

  const validationSchema = Yup.object({
    carName: Yup.string().required("Car name is required"),
    model: Yup.string().required("Model is required"),
    description: Yup.string().required("Description is required"),
    driverName: Yup.string().required("Driver name is required"),
    location: Yup.string().required("Location is required"),
    status: Yup.string()
      .oneOf(["Available", "Booked"], "Invalid status")
      .required("Status is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const initialValues = {
    carName: "",
    model: "",
    description: "",
    driverName: "",
    location: "",
    status: "",
    image: null,
  };

  const onSubmit = (values, { resetForm }) => {
    if (editingCar) {
      // Update car
      const updatedCars = cars.map((car) =>
        car._id === editingCar._id
          ? {
              ...editingCar,
              ...values,
              image: values.image instanceof File ? URL.createObjectURL(values.image) : editingCar.image,
            }
          : car
      );
      setCars(updatedCars);
      setEditingCar(null);
    } else {
      // Add new car
      const newCar = {
        _id: Date.now(),
        ...values,
        image: URL.createObjectURL(values.image),
      };
      setCars([...cars, newCar]);
    }
    resetForm();
    setOpenForm(false);
  };

  const handleDelete = (car) => {
    setCars(cars.filter((c) => c._id !== car._id));
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setOpenForm(true);
  };

  const handleView = (car) => {
    setViewingCar(car);
    setOpenView(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Rent Car List
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

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Car Name</b></TableCell>
              <TableCell><b>Model</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Driver Name</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <TableRow key={car._id}>
                  <TableCell>{car.carName}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.description}</TableCell>
                  <TableCell>{car.driverName}</TableCell>
                  <TableCell>{car.location}</TableCell>
                  <TableCell>
                    <Avatar
                      src={car.image}
                      alt={car.carName}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{car.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleView(car)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleEdit(car)}>
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

      {/* Add/Edit Car Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCar ? "Edit Car" : "Add New Car"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={editingCar || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginTop: "10px",
                }}
              >
                {["carName", "model", "driverName", "location"].map((field) => (
                  <div key={field}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <Field
                      name={field}
                      type="text"
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <ErrorMessage
                      name={field}
                      component="div"
                      style={{ color: "red", fontSize: "13px" }}
                    />
                  </div>
                ))}

                {/* Description */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Description
                  </label>
                  <Field
                    name="description"
                    as="textarea"
                    rows="3"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      resize: "none",
                    }}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    style={{ color: "red", fontSize: "13px" }}
                  />
                </div>

                {/* Status */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Status
                  </label>
                  <Field
                    name="status"
                    as="select"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">Select status</option>
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    style={{ color: "red", fontSize: "13px" }}
                  />
                </div>

                {/* Image */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    onChange={(e) => setFieldValue("image", e.target.files[0])}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      background: "#f9f9f9",
                    }}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    style={{ color: "red", fontSize: "13px" }}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  style={{
                    marginTop: "10px",
                    padding: "12px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                  }}
                >
                  {editingCar ? "Update Car" : "Add Car"}
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* View Car Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Car Details</DialogTitle>
        <DialogContent>
          {viewingCar && (
            <div style={{ padding: "10px", lineHeight: "1.8" }}>
              <p><b>Car Name:</b> {viewingCar.carName}</p>
              <p><b>Model:</b> {viewingCar.model}</p>
              <p><b>Description:</b> {viewingCar.description}</p>
              <p><b>Driver Name:</b> {viewingCar.driverName}</p>
              <p><b>Location:</b> {viewingCar.location}</p>
              <p><b>Status:</b> {viewingCar.status}</p>
              <Avatar
                src={viewingCar.image}
                alt={viewingCar.carName}
                variant="rounded"
                sx={{ width: 100, height: 100, marginTop: "10px" }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentCar;
