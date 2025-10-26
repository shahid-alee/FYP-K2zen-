import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent, TextField, Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const DashboardPackages = () => {
  const [packages, setPackages] = useState([]);
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);

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

 const handleDetailsSave = async (values) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/packages/${selectedPkg._id}/details`,
      values
    );
    setPackages(packages.map(p => (p._id === res.data._id ? res.data : p)));
    setDetailsOpen(false);
  } catch (err) {
    console.error("Error saving details:", err);
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
              <TableCell><b>Add Details</b></TableCell>
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
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSelectedPkg(pkg);
                        setDetailsOpen(true);
                      }}
                    >
                      Add
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary"><VisibilityIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(pkg)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">No Packages</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Package Dialog */}
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

      {/* Add/Edit Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Details</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              overview: selectedPkg?.overview || "",
              itinerary: selectedPkg?.itinerary || [{ day: 1, description: "" }],
              services: selectedPkg?.services || "",
            }}
            enableReinitialize
            onSubmit={handleDetailsSave}
          >
            {({ values, setFieldValue, handleChange }) => (
              <Form style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
                <TextField
                  label="Overview"
                  name="overview"
                  multiline
                  rows={3}
                  value={values.overview}
                  onChange={handleChange}
                />

                <Typography variant="subtitle1">Itinerary</Typography>
                {values.itinerary.map((it, index) => (
                  <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography>Day {it.day}</Typography>
                    <TextField
                      name={`itinerary.${index}.description`}
                      value={it.description}
                      onChange={handleChange}
                      placeholder="Description for this day"
                      multiline
                      rows={2}
                    />
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    setFieldValue("itinerary", [
                      ...values.itinerary,
                      { day: values.itinerary.length + 1, description: "" },
                    ])
                  }
                >
                  Add Day
                </Button>

                <TextField
                  label="Services"
                  name="services"
                  multiline
                  rows={3}
                  value={values.services}
                  onChange={handleChange}
                />

                <Button type="submit" variant="contained">Save Details</Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPackages;
