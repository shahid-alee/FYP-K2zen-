import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import "./Packagebybudget.scss";

export default function PackageByBudget() {
  const [budget, setBudget] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [searched, setSearched] = useState(false); // ✅ new flag
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!budget) return;

    try {
      const res = await axios.get("http://localhost:8000/api/packages");
      const allPackages = res.data;

      const filtered = allPackages.filter(
        (pkg) => pkg.price >= budget - 5000 && pkg.price <= parseInt(budget) + 5000
      );

      setFilteredPackages(filtered);
      setSearched(true); // ✅ mark as searched
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  return (
    <Box className="budget-container">
      <Typography variant="h4" className="budget-title">
        Find Packages by Your Budget
      </Typography>

      <Typography variant="body1" className="budget-subtext">
        Enter your desired budget below to explore matching travel packages.
      </Typography>

      {/* ✅ Search Input */}
      <Box className="budget-search">
        <TextField
          variant="outlined"
          placeholder="Enter your budget (PKR)"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="budget-input"
        />
        <Button variant="contained" onClick={handleSearch} className="search-btn">
          Search
        </Button>
      </Box>

      {/* ✅ Packages Display */}
      {filteredPackages.length > 0 ? (
        <Grid container spacing={3}>
          {filteredPackages.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="package-card">
                <CardMedia
                  component="img"
                  height="220"
                  image={
                    pkg.image
                      ? `http://localhost:8000/${pkg.image.replace(/\\/g, "/")}`
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={pkg.title || "Package Image"}
                  className="package-image"
                />

                <CardContent className="package-content">
                  <Typography variant="h6" className="package-title">
                    {pkg.title || "Untitled Package"}
                  </Typography>

                  <Typography variant="body2" className="package-description">
                    {pkg.description || "No description available"}
                  </Typography>

                  <Typography variant="subtitle2" className="package-duration">
                    Duration: {pkg.days} Days
                  </Typography>

                  <Typography variant="subtitle1" className="package-price">
                    Price: PKR {pkg.price?.toLocaleString() || "N/A"}
                  </Typography>

                  {pkg.places?.length > 0 && (
                    <Typography variant="body2" className="package-places">
                      Places: {pkg.places.join(", ")}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate("/viewDetails", { state: { id: pkg._id } })
                    }
                    className="view-details-btn"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        searched && (
          <Typography className="no-packages">
            No packages found in this budget range.
          </Typography>
        )
      )}
    </Box>
  );
}
