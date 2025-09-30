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
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UsersTable = () => {
  const [users, setUsers] = useState([
    {
      _id: 1,
      name: "Ali Khan",
      address: "Street 12, Lahore, Pakistan",
      phone: "03001234567",
      role: "Customer",
    },
    {
      _id: 2,
      name: "Sara Ahmed",
      address: "Main Road, Karachi, Pakistan",
      phone: "03119876543",
      role: "Admin",
    },
  ]);

  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handlers
  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenView(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((u) => u._id !== userId));
  };

  const handleSaveEdit = () => {
    setUsers(users.map((u) => (u._id === selectedUser._id ? selectedUser : u)));
    setOpenEdit(false);
  };

  const handleAddUser = () => {
    setUsers([...users, { ...selectedUser, _id: Date.now() }]);
    setOpenAdd(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Users List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedUser({ name: "", address: "", phone: "", role: "" });
          setOpenAdd(true);
        }}
        style={{ marginBottom: "15px" }}
      >
        Add New User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Address</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleView(user)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Users Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View User Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <Typography><b>Name:</b> {selectedUser.name}</Typography>
              <Typography><b>Address:</b> {selectedUser.address}</Typography>
              <Typography><b>Phone:</b> {selectedUser.phone}</Typography>
              <Typography><b>Role:</b> {selectedUser.role}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={selectedUser?.name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={selectedUser?.address || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, address: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={selectedUser?.phone || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            value={selectedUser?.role || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, address: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAddUser} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersTable;
