import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent,
  TextField, Box, Snackbar, Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const DashboardPackages = () => {
  const [packages, setPackages] = useState([]);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });

  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/packages");
      setPackages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    days: Yup.number().required("Required"),
    destinationName: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    image: Yup.mixed().nullable(),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("days", values.days);
      formData.append("destinationName", values.destinationName);
      formData.append("location", values.location);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("status", values.status);

      // ✅ Places convert to JSON array
      formData.append(
        "places",
        JSON.stringify(values.places.split(",").map((p) => p.trim()))
      );

      // ✅ Image append correctly
      if (values.image) formData.append("image", values.image);

      const res = await axios.post("http://localhost:8000/api/packages", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setPackages((prev) => [res.data, ...prev]);
      resetForm();
      setPreview(null);
      setOpen(false);
      setSnack({ open: true, msg: "✅ Package added successfully!", type: "success" });
    } catch (err) {
      console.error("Add package error:", err);
      setSnack({ open: true, msg: "❌ Failed to add package", type: "error" });
    }
  };

  const handleDelete = async (pkg) => {
    try {
      await axios.delete(`http://localhost:8000/api/packages/${pkg._id}`);
      setPackages(packages.filter((p) => p._id !== pkg._id));
      setSnack({ open: true, msg: "🗑 Package deleted!", type: "info" });
    } catch (err) {
      console.error("Delete package error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Travel Packages Management
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        + Add Package
      </Button>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: "#e9f5ee" }}>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Destination</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <TableRow key={pkg._id}>
                  <TableCell>{pkg.title}</TableCell>
                  <TableCell>{pkg.destinationName}</TableCell>
                  <TableCell>{pkg.location}</TableCell>
                  <TableCell>PKR {pkg.price}</TableCell>
                  <TableCell>
                    <Avatar
                      src={
                        pkg.image
                          ? `http://localhost:8000/${pkg.image.replace(/\\/g, "/")}`
                          : ""
                      }
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/viewDetails`, { state: { id: pkg._id } })}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(pkg)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={7} align="center">No Packages Found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Package Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add Package</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: "", days: 3, destinationName: "", location: "", price: 0,
              places: "", description: "", image: null, status: "Available"
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, setFieldValue, values }) => (
              <Form style={{ marginTop: 10 }}>
                <TextField label="Package Title" name="title" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label="Days" name="days" type="number" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label="Destination" name="destinationName" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label="Location" name="location" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label="Price" name="price" type="number" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label="Places (comma separated)" name="places" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label="Description" name="description" fullWidth multiline rows={3} onChange={handleChange} sx={{ mb: 2 }} />

                {/* Image Upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("image", file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
                {preview && (
                  <img src={preview} alt="Preview" style={{ width: 120, height: 80, marginTop: 10, borderRadius: 8 }} />
                )}

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                  Add Package
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.type}>{snack.msg}</Alert>
      </Snackbar>
    </div>
  );
};

export default DashboardPackages;
