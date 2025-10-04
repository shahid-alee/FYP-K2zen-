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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ToursTableWithForm = () => {
  // ✅ define tours state
  const [tours, setTours] = useState([]);

  const [open, setOpen] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Tour name is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string()
      .oneOf(["Available", "Booked"], "Invalid status")
      .required("Status is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const initialValues = {
    name: "",
    location: "",
    description: "",
    status: "",
    image: null,
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/tours", {
        name: values.name,
        location: values.location,
        description: values.description,
        status: values.status,
        image: URL.createObjectURL(values.image), // demo purpose only
      });

      // ✅ update state
      setTours([...tours, response.data]);
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error adding tour:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => setTours(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (tour) => {
    setTours(tours.filter((t) => t._id !== tour._id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Tours List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        Add New Tour
      </Button>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Tour Name</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.length > 0 ? (
              tours.map((tour) => (
                <TableRow key={tour._id}>
                  <TableCell>{tour.name}</TableCell>
                  <TableCell>{tour.location}</TableCell>
                  <TableCell>{tour.description}</TableCell>
                  <TableCell>
                    <Avatar
                      src={tour.image}
                      alt={tour.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{tour.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(tour)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Tours Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Tour</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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
                {/* Tour Name */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Tour Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <ErrorMessage name="name" component="div" style={{ color: "red", fontSize: "13px" }} />
                </div>

                {/* Location */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Location
                  </label>
                  <Field
                    name="location"
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <ErrorMessage name="location" component="div" style={{ color: "red", fontSize: "13px" }} />
                </div>

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
                  <ErrorMessage name="description" component="div" style={{ color: "red", fontSize: "13px" }} />
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
                  <ErrorMessage name="status" component="div" style={{ color: "red", fontSize: "13px" }} />
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
                  <ErrorMessage name="image" component="div" style={{ color: "red", fontSize: "13px" }} />
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
                  Add Tour
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToursTableWithForm;
