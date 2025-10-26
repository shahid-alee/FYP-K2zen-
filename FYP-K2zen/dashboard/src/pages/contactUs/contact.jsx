import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const API = "http://localhost:8000/api/contact";

export default function ContactDashboard() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get(API);
    setMessages(res.data);
  };

  const handleReply = async () => {
    await axios.post(`${API}/reply`, {
      to: selected.email,
      subject: `Reply to your message: ${selected.subject}`,
      message: reply,
    });
    alert("✅ Email sent successfully!");
    setReply("");
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Contact Messages
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Subject</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((m) => (
              <TableRow key={m._id}>
                <TableCell>{m.firstName} {m.lastName}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.phone}</TableCell>
                <TableCell>{m.subject}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => { setSelected(m); setOpen(true); }}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Message Details</DialogTitle>
        <DialogContent>
          {selected && (
            <Box>
              <Typography><b>From:</b> {selected.firstName} {selected.lastName}</Typography>
              <Typography><b>Email:</b> {selected.email}</Typography>
              <Typography><b>Message:</b> {selected.message}</Typography>

              <TextField
                label="Reply Message"
                multiline
                rows={4}
                fullWidth
                sx={{ mt: 2 }}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />

              <Button
                variant="contained"
                sx={{ mt: 2, background: "#239753" }}
                onClick={handleReply}
              >
                Send Reply
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
