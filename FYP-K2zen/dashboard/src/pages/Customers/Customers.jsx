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

const CustomersTable = () => {
  const [customers, setCustomers] = useState([
    {
      _id: 1,
      name: "Shahid Ali",
      mobile: "03001234567",
      tours: 5,
      address: "Islamabad, Pakistan",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      _id: 2,
      name: "Ahmed Raza",
      mobile: "03219876543",
      tours: 3,
      address: "Lahore, Pakistan",
      image: "https://via.placeholder.com/100",
      status: "Inactive",
    },
  ]);

  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().required("Mobile No is required"),
    tours: Yup.number().required("No of Tours is required"),
    address: Yup.string().required("Address is required"),
    status: Yup.string()
      .oneOf(["Active", "Inactive"], "Invalid status")
      .required("Status is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const initialValues = {
    name: "",
    mobile: "",
    tours: "",
    address: "",
    status: "",
    image: null,
  };

  const onSubmit = (values, { resetForm }) => {
    if (editingCustomer) {
      // Update customer
      const updated = customers.map((c) =>
        c._id === editingCustomer._id
          ? {
              ...editingCustomer,
              ...values,
              image:
                values.image instanceof File
                  ? URL.createObjectURL(values.image)
                  : editingCustomer.image,
            }
          : c
      );
      setCustomers(updated);
      setEditingCustomer(null);
    } else {
      // Add new customer
      const newCustomer = {
        _id: Date.now(),
        ...values,
        image: URL.createObjectURL(values.image),
      };
      setCustomers([...customers, newCustomer]);
    }
    resetForm();
    setOpenForm(false);
  };

  const handleDelete = (customer) => {
    setCustomers(customers.filter((c) => c._id !== customer._id));
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setOpenForm(true);
  };

  const handleView = (customer) => {
    setViewingCustomer(customer);
    setOpenView(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Customers List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditingCustomer(null);
          setOpenForm(true);
        }}
        style={{ marginBottom: "20px" }}
      >
        Add New Customer
      </Button>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Mobile No</b></TableCell>
              <TableCell><b>No of Tours</b></TableCell>
              <TableCell><b>Address</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((c) => (
                <TableRow key={c._id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.mobile}</TableCell>
                  <TableCell>{c.tours}</TableCell>
                  <TableCell>{c.address}</TableCell>
                  <TableCell>
                    <Avatar
                      src={c.image}
                      alt={c.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{c.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleView(c)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleEdit(c)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(c)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Customers Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCustomer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={editingCustomer || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "10px" }}>
                {["name", "mobile", "tours", "address"].map((field) => (
                  <div key={field}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                      {field === "mobile" ? "Mobile No" : field === "tours" ? "No of Tours" : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <Field
                      name={field}
                      type={field === "tours" ? "number" : "text"}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                    <ErrorMessage name={field} component="div" style={{ color: "red", fontSize: "13px" }} />
                  </div>
                ))}

                {/* Status */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Status</label>
                  <Field
                    name="status"
                    as="select"
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                  >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" style={{ color: "red", fontSize: "13px" }} />
                </div>

                {/* Image */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Image</label>
                  <input
                    name="image"
                    type="file"
                    onChange={(e) => setFieldValue("image", e.target.files[0])}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", background: "#f9f9f9" }}
                  />
                  <ErrorMessage name="image" component="div" style={{ color: "red", fontSize: "13px" }} />
                </div>

                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} style={{ marginTop: "10px", padding: "12px", borderRadius: "6px", fontWeight: "bold" }}>
                  {editingCustomer ? "Update Customer" : "Add Customer"}
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          {viewingCustomer && (
            <div style={{ padding: "10px", lineHeight: "1.8" }}>
              <p><b>Name:</b> {viewingCustomer.name}</p>
              <p><b>Mobile No:</b> {viewingCustomer.mobile}</p>
              <p><b>No of Tours:</b> {viewingCustomer.tours}</p>
              <p><b>Address:</b> {viewingCustomer.address}</p>
              <p><b>Status:</b> {viewingCustomer.status}</p>
              <Avatar src={viewingCustomer.image} alt={viewingCustomer.name} variant="rounded" sx={{ width: 100, height: 100, marginTop: "10px" }} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersTable;
