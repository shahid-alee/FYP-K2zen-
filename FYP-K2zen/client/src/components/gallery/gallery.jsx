import React, { useState } from "react";
import "./gallery.scss";

// Local images
import mountain1 from "../../assets/heroSection/bgimg.jpg";
import mountain2 from "../../assets/heroSection/bg2.jpg";
import lake1 from "../../assets/heroSection/bg1.jpg";
import lake2 from "../../assets/heroSection/bg1.jpg";
import river1 from "../../assets/heroSection/bg2.jpg";
import river2 from "../../assets/heroSection/bg1.jpg";
import city1 from "../../assets/heroSection/bg2.jpg";
import city2 from "../../assets/heroSection/bg1.jpg";
import culture1 from "../../assets/heroSection/bg2.jpg";
import culture2 from "../../assets/heroSection/bg1.jpg";

const categories = {
  All: [
    { src: mountain1, title: "K2 Peak" },
    { src: mountain2, title: "Nanga Parbat" },
    { src: lake1, title: "Sheosar Lake" },
    { src: lake2, title: "Attabad Lake" },
    { src: river1, title: "Indus River" },
    { src: river2, title: "Gilgit River" },
    { src: city1, title: "Skardu City" },
    { src: city2, title: "Hunza Valley" },
    { src: culture1, title: "Traditional Dance" },
    { src: culture2, title: "Local Handicrafts" },
  ],
  Mountains: [
    { src: mountain1, title: "K2 Peak" },
    { src: mountain2, title: "Nanga Parbat" },
  ],
  Lakes: [
    { src: lake1, title: "Sheosar Lake" },
    { src: lake2, title: "Attabad Lake" },
  ],
  Rivers: [
    { src: river1, title: "Indus River" },
    { src: river2, title: "Gilgit River" },
  ],
  Cities: [
    { src: city1, title: "Skardu City" },
    { src: city2, title: "Hunza Valley" },
  ],
  Culture: [
    { src: culture1, title: "Traditional Dance" },
    { src: culture2, title: "Local Handicrafts" },
  ],
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">Explore Our Gallery</h2>
        <p className="gallery-subtitle">
          Discover the beauty of Gilgit-Baltistan — mountains, lakes, rivers, and vibrant culture.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="gallery-categories">
        {Object.keys(categories).map((cat) => (
          <span
            key={cat}
            className={`gallery-category ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Image Grid */}
      <div className="gallery-grid">
        {categories[selectedCategory].map((img, i) => (
          <div key={i} className="gallery-card">
            <img src={img.src} alt={img.title} loading="lazy" />
            <div className="gallery-overlay">
              <h3>{img.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
