import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./destination.scss";

const destinations = [
  {
    name: "Skardu",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Shangrila_Resort_Skardu.jpg",
    description: "Explore the mesmerizing landscapes and lakes of Skardu, the gateway to mighty K2.",
    path: "/viewDestination/skarduPackages",
  },
  {
    name: "Hunza",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Hunza_Valley.jpg",
    description: "Discover the peaceful valleys, ancient forts, and culture of Hunza.",
    path: "/viewDestination/hunzaPackages",
  },
  {
    name: "Gilgit",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Gilgit_city.jpg",
    description: "The heart of Gilgit-Baltistan, surrounded by snow-capped peaks and rivers.",
    path: "/viewDestination/gilgitPackages",
  },
  {
    name: "Astore",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Astore_Valley.jpg",
    description: "A hidden gem offering lush green valleys and crystal-clear lakes.",
    path: "/viewDestination/astorePackages",
  },
  {
    name: "Diamer",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Nanga_Parbat_diamer_side.jpg",
    description: "Home to Nanga Parbat, the Killer Mountain, and stunning alpine scenery.",
    path: "/viewDestination/diamerPackages",
  },
  {
    name: "Shiger",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Shigar_Fort.jpg",
    description: "Experience the charm of Shiger Fort and the gateway to the Karakoram Range.",
    path: "/viewDestination/shigerPackages",
  },
  {
    name: "Ghanche",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Khaplu_Palace.jpg",
    description: "Visit the serene Khaplu Valley and witness rich Balti culture.",
    path: "/viewDestination/ghanchePackages",
  },
  {
    name: "Kharmang",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Manthokha_Waterfall_Kharmang.jpg",
    description: "Famous for its waterfalls and peaceful landscapes along the Indus River.",
    path: "/viewDestination/kharmangPackages",
  },
  {
    name: "Ghizer",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Phander_Lake_Ghizer.jpg",
    description: "Enjoy the turquoise lakes and beautiful valleys of Ghizer.",
    path: "/viewDestination/ghizerPackages",
  },
  {
    name: "Nagar",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Nagar_Valley_View.jpg",
    description: "A breathtaking valley facing Hunza, offering scenic views and glaciers.",
    path: "/viewDestination/nagarPackages",
  },
];

export default function Destination() {
  return (
    <Box className="destination-page">
      <Box className="section-header">
        <Typography variant="h4" className="section-title">
          Destinations
        </Typography>
      </Box>

      <Box className="destination-container">
        {destinations.map((item, index) => (
          <Card key={index} className="destination-card">
            {/* Left Side Image */}
            <CardMedia
              component="img"
              image={item.image}
              alt={item.name}
              className="destination-image"
            />

            {/* Right Side Content */}
            <Box className="destination-content">
              <CardContent>
                <Typography variant="h5" className="destination-name">
                  {item.name}
                </Typography>
                <Typography variant="body1" className="destination-description">
                  {item.description}
                </Typography>
                <Link to={item.path}>
                  <Button variant="contained" className="view-btn">
                    View Destination
                  </Button>
                </Link>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
