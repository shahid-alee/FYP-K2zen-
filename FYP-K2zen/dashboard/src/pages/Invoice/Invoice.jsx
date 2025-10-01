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

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([
    {
      _id: 1,
      invoiceNo: "INV001",
      name: "Shahid Ali",
      mobile: "03001234567",
      tours: 2,
      address: "Islamabad, Pakistan",
      price: 20000,
      status: "Paid",
    },
    {
      _id: 2,
      invoiceNo: "INV002",
      name: "Ahmad Khan",
      mobile: "03017654321",
      tours: 1,
      address: "Lahore, Pakistan",
      price: 12000,
      status: "Pending",
    },
  ]);

  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(null);
  const [openEdit, setOpenEdit] = useState(null);

  const validationSchema = Yup.object({
    invoiceNo: Yup.string().required("Invoice number is required"),
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().required("Mobile No is required"),
    tours: Yup.number().required("No of Tours is required"),
    address: Yup.string().required("Address is required"),
    price: Yup.number().required("Price is required"),
    status: Yup.string()
      .oneOf(["Paid", "Pending"], "Invalid status")
      .required("Status is required"),
  });

  const initialValues = {
    invoiceNo: "",
    name: "",
    mobile: "",
    tours: "",
    address: "",
    price: "",
    status: "",
  };

  const onSubmit = (values, { resetForm }) => {
    const newInvoice = { _id: Date.now(), ...values };
    setInvoices([...invoices, newInvoice]);
    resetForm();
    setOpenForm(false);
  };

  const handleDelete = (invoice) => {
    setInvoices(invoices.filter((i) => i._id !== invoice._id));
  };

  const handleEdit = (values) => {
    setInvoices(invoices.map((inv) => (inv._id === values._id ? { ...values } : inv)));
    setOpenEdit(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Invoice List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
        style={{ marginBottom: "20px" }}
      >
        Add New Invoice
      </Button>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Invoice No</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Mobile No</b></TableCell>
              <TableCell><b>No of Tours</b></TableCell>
              <TableCell><b>Address</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell>{invoice.invoiceNo}</TableCell>
                  <TableCell>{invoice.name}</TableCell>
                  <TableCell>{invoice.mobile}</TableCell>
                  <TableCell>{invoice.tours}</TableCell>
                  <TableCell>{invoice.address}</TableCell>
                  <TableCell>{invoice.price}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => setOpenView(invoice)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => setOpenEdit(invoice)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(invoice)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Invoices Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Invoice Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Invoice</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginTop: "10px",
                }}
              >
                {["invoiceNo", "name", "mobile", "tours", "address", "price"].map((field) => (
                  <div key={field}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <Field
                      name={field}
                      type={field === "tours" || field === "price" ? "number" : "text"}
                      as={field === "address" ? "textarea" : "input"}
                      rows={field === "address" ? 2 : undefined}
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

                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Status
                  </label>
                  <Field
                    as="select"
                    name="status"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">Select status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </Field>
                  <ErrorMessage name="status" component="div" style={{ color: "red", fontSize: "13px" }} />
                </div>

                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  Add Invoice
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* View Invoice Dialog */}
      <Dialog open={!!openView} onClose={() => setOpenView(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Invoice Details</DialogTitle>
        <DialogContent>
          {openView && (
            <div style={{ lineHeight: "1.8" }}>
              <p><b>Invoice No:</b> {openView.invoiceNo}</p>
              <p><b>Name:</b> {openView.name}</p>
              <p><b>Mobile No:</b> {openView.mobile}</p>
              <p><b>No of Tours:</b> {openView.tours}</p>
              <p><b>Address:</b> {openView.address}</p>
              <p><b>Price:</b> {openView.price}</p>
              <p><b>Status:</b> {openView.status}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Invoice Dialog */}
      <Dialog open={!!openEdit} onClose={() => setOpenEdit(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Invoice</DialogTitle>
        <DialogContent>
          {openEdit && (
            <Formik initialValues={openEdit} validationSchema={validationSchema} onSubmit={handleEdit}>
              {({ isSubmitting }) => (
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "10px",
                  }}
                >
                  {["invoiceNo", "name", "mobile", "tours", "address", "price"].map((field) => (
                    <div key={field}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <Field
                        name={field}
                        type={field === "tours" || field === "price" ? "number" : "text"}
                        as={field === "address" ? "textarea" : "input"}
                        rows={field === "address" ? 2 : undefined}
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

                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <option value="">Select status</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </Field>
                    <ErrorMessage name="status" component="div" style={{ color: "red", fontSize: "13px" }} />
                  </div>

                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Save Changes
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceTable;
