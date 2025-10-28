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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/auth/all");
      if (res.data.status) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenView(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:8000/api/auth/${userId}`);
      fetchUsers();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Users List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell align="center"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleView(user)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Users Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* View User Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <Typography><b>Name:</b> {selectedUser.username}</Typography>
              <Typography><b>Email:</b> {selectedUser.email}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersTable;
