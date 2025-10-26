import React, { useEffect, useState } from "react";
import { useLocation ,useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";

export default function ViewDestination() {
  const location = useLocation();
  const { destinationName } = location.state || {};
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (destinationName) {
      const fetchPackages = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/packages?destination=${destinationName}`
          );
          setPackages(res.data);
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      };
      fetchPackages();
    }
  }, [destinationName]);

  return (
    <Box
      sx={{
        py: 5,
        px: { xs: 2, md: 6 },
        backgroundColor: "#f9fafc",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
          color: "#1C7942",
          marginTop: "5%"
        }}
      >
        Packages in {destinationName || "Selected Destination"}
      </Typography>

      {packages.length > 0 ? (
        <Grid container spacing={3}>
          {packages.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
                }}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  height="220"
                  image={
                    pkg.image
                      ? `http://localhost:8000/${pkg.image.replace(/\\/g, "/")}`
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={pkg.title || "Package Image"}
                />

                {/* Content */}
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#1C7942" }}
                  >
                    {pkg.title || "Untitled Package"}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1.5 }}
                  >
                    {pkg.description || "No description available"}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ color: "#239753" }}>
                    Duration: {pkg.days} Days
                  </Typography>

                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Price: PKR {pkg.price?.toLocaleString() || "N/A"}
                  </Typography>

                  {/* ✅ Show all places */}
                  {pkg.places?.length > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontStyle: "italic",
                        color: "#666",
                      }}
                    >
                      Places: {pkg.places.join(", ")}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#239753",
                      "&:hover": { backgroundColor: "#1C7942" },
                      borderRadius: 2,
                      width: "100%",
                    }}
                    onClick={() =>
                      navigate("/viewDetails", { state: { id: pkg._id } })
                    }
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography textAlign="center" color="text.secondary">
          No packages found for {destinationName}.
        </Typography>
      )}
    </Box>
  );
}
