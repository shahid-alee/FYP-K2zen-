import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const DashboardPackages = () => {
  const [packages, setPackages] = useState([]);
  const [open, setOpen] = useState(false);

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
    title: Yup.string().required("Title required"),
    days: Yup.number().required("Days required"),
    destinationName: Yup.string().required("Destination required"),
    price: Yup.number().required("Price required"),
    image: Yup.mixed().required("Image required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => formData.append(key, val));
      const res = await axios.post("http://localhost:8000/api/packages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPackages(prev => [res.data, ...prev]);
      resetForm();
      setOpen(false);
    } catch (err) {
      console.error("Add package error:", err);
    }
  };

  const handleDelete = async (pkg) => {
    try {
      await axios.delete(`http://localhost:8000/api/packages/${pkg._id}`);
      setPackages(packages.filter(p => p._id !== pkg._id));
    } catch (err) {
      console.error("Delete package error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>Packages</Typography>

      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Add Package
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Destination</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.length > 0 ? (
              packages.map(pkg => (
                <TableRow key={pkg._id}>
                  <TableCell>{pkg.title}</TableCell>
                  <TableCell>{pkg.destinationName}</TableCell>
                  <TableCell>{pkg.location}</TableCell>
                  <TableCell>PKR {pkg.price}</TableCell>
                  <TableCell>
                    <Avatar
                      src={pkg.image?.startsWith("http") ? pkg.image : `http://localhost:8000/${pkg.image}`}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary"><VisibilityIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(pkg)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No Packages</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Package</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: "", days: 3, destinationName: "", location: "", price: 0,
              places: "", description: "", image: null, status: "Available"
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue }) => (
              <Form style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
                <Field name="title" placeholder="Title" />
                <ErrorMessage name="title" component="div" style={{ color: "red" }} />
                <Field name="days" type="number" placeholder="Days" />
                <ErrorMessage name="days" component="div" style={{ color: "red" }} />
                <Field name="destinationName" placeholder="Destination" />
                <ErrorMessage name="destinationName" component="div" style={{ color: "red" }} />
                <Field name="location" placeholder="Location" />
                <Field name="price" type="number" placeholder="Price" />
                <ErrorMessage name="price" component="div" style={{ color: "red" }} />
                <Field name="places" placeholder="Places (comma separated)" />
                <Field name="description" as="textarea" rows={3} placeholder="Description" />
                <input name="image" type="file" onChange={(e) => setFieldValue("image", e.currentTarget.files[0])} />
                <ErrorMessage name="image" component="div" style={{ color: "red" }} />
                <Button type="submit" variant="contained">Add Package</Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPackages;
