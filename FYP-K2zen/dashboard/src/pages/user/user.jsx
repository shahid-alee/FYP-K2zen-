// import React, { useEffect, useState } from "react";
// import {
//   Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, IconButton, Menu,
//   MenuItem, Typography, Button
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import axios from "axios";
// import "./User.scss";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users"); 
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   const handleMenuOpen = (event, user) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedUser(user);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedUser(null);
//   };

//   return (
//     <div className="users-page">
//       <div className="users-header">
//         <Typography variant="h4" className="page-title">Users</Typography>
//         <Button variant="contained" color="primary">Add New User</Button>
//       </div>

//       <TableContainer component={Paper} className="users-table">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user, index) => (
//               <TableRow key={user._id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{user.firstName} {user.lastName}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.roles[0]}</TableCell>
//                 <TableCell><span className={`status active`}>Active</span></TableCell>
//                 <TableCell align="center">
//                   <IconButton onClick={(e) => handleMenuOpen(e, user)}>
//                     <MoreVertIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//         <MenuItem onClick={() => alert(`Edit ${selectedUser?.name}`)}>Edit</MenuItem>
//         <MenuItem onClick={() => alert(`Delete ${selectedUser?.name}`)}>Delete</MenuItem>
//         <MenuItem onClick={() => alert(`Update ${selectedUser?.name}`)}>Update</MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default Users;
