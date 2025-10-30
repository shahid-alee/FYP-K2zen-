import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    if (!destinationName) return;

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
  }, [destinationName]);

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 6 },
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* ✅ Page Title */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
          color: "#1C7942",
          marginTop: "5%",
        }}
      >
        {destinationName
          ? `Packages in ${destinationName}`
          : "Available Packages"}
      </Typography>

      {packages.length > 0 ? (
        <Grid container spacing={3}>
          {packages.map((pkg) => {
            const imgPath = pkg.image
              ? `http://localhost:8000/${pkg.image.replace(/\\/g, "/")}`
              : "https://via.placeholder.com/300x200";

            return (
              <Grid item xs={12} sm={6} md={4} key={pkg._id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    height: "100%",
                    backgroundColor: "#fff",
                    transition: "0.3s",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {/* ✅ Image */}
                  <CardMedia
                    component="img"
                    height="220"
                    image={imgPath}
                    alt={pkg.title || "Package Image"}
                  />

                  {/* ✅ Card Content */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "700", color: "#1C7942", mb: 1 }}
                    >
                      {pkg.title || "Untitled Package"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {pkg.description || "Description not available"}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#1C7942" }}>
                      Duration: <b>{pkg.days} Days</b>
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mt: 1, color: "#000" }}
                    >
                      PKR {pkg.price?.toLocaleString() || "N/A"}
                    </Typography>

                    {pkg.places?.length > 0 && (
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          color: "#555",
                          fontStyle: "italic",
                        }}
                      >
                        Places: {pkg.places.join(", ")}
                      </Typography>
                    )}

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        py: 1,
                        fontWeight: "bold",
                        backgroundColor: "#239753",
                        "&:hover": { backgroundColor: "#1C7942" },
                        borderRadius: 2,
                      }}
                      onClick={() =>
                        navigate("/viewDetails", {
                          state: { id: pkg._id },
                        })
                      }
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography
          textAlign="center"
          sx={{
            fontSize: "18px",
            mt: 5,
            color: "#777",
            fontWeight: "500",
          }}
        >
          No packages found for this destination.
        </Typography>
      )}
    </Box>
  );
}
