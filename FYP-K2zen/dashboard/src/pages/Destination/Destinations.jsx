import React, { useEffect, useState } from "react";
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

const DestinationForm = () => {
  const [destinations, setDestinations] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch all destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/destinations");
        setDestinations(res.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Destination name is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const initialValues = {
    name: "",
    description: "",
    image: null,
  };

  // Submit Handler
  const onSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", values.image);

      const res = await axios.post(
        "http://localhost:8000/api/destinations",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update both frontend table and dashboard instantly
      setDestinations([...destinations, res.data]);
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  // Delete destination
const handleDelete = async (destination) => {
  try {
    await axios.delete(
      `http://localhost:8000/api/destinations/${destination._id}`
    );

    setDestinations(destinations.filter((d) => d._id !== destination._id));
  } catch (error) {
    console.error("Error deleting destination:", error);
  }
};


  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Destinations List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        Add New Destination
      </Button>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Destination Name</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell>
                <b>Image</b>
              </TableCell>
              <TableCell align="center">
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {destinations.length > 0 ? (
              destinations.map((destination) => (
                <TableRow key={destination._id}>
                  <TableCell>{destination.name}</TableCell>
                  <TableCell>{destination.description}</TableCell>
                  <TableCell>
                    <Avatar
                      src={
                        destination.image?.startsWith("http")
                          ? destination.image
                          : `http://localhost:8000/${destination.image?.replace(
                              /\\/g,
                              "/"
                            )}`
                      }
                      alt={destination.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(destination)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Destinations Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Destination</DialogTitle>
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
                {/* Destination Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Destination Name
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
                  <ErrorMessage
                    name="name"
                    component="div"
                    style={{ color: "red", fontSize: "13px" }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
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

                {/* Image */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
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
                  Add Destination
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DestinationForm;