import React, { useState } from "react";
import "./gallery.scss";

// ✅ Mountains
import mountain1 from "../../assets/gallery/mountains/Broad-Peak-product01.jpg";
import mountain2 from "../../assets/gallery/mountains/gasherbrum_ii_mountain_climb_3.webp";
import mountain3 from "../../assets/gallery/mountains/Gasherbrum-1.jpg";
import mountain4 from "../../assets/gallery/mountains/k2-mountain.jpg";
import mountain5 from "../../assets/gallery/mountains/lady-finger-peak.jpg";
import mountain6 from "../../assets/gallery/mountains/masoor rock.jpg";
import mountain7 from "../../assets/gallery/mountains/nanga-parbat-the-snow.jpg";
import mountain8 from "../../assets/gallery/mountains/nanga-parbat-the-snow.jpg";

// ✅ Lakes
import lake1 from "../../assets/gallery/lake/Blind-Lake-Skardu.jpg";
import lake2 from "../../assets/gallery/lake/Borith-Lake-Gojal-Hunza.jpg";
import lake3 from "../../assets/gallery/lake/Naltar-Lake.jpg";
import lake4 from "../../assets/gallery/lake/Phandar-Lake.jpg";
import lake5 from "../../assets/gallery/lake/Rainbow-Lake-Skardu.jpg";
import lake6 from "../../assets/gallery/lake/Rush-Lake-Pakistan.jpg";
import lake7 from "../../assets/gallery/lake/Sadpara-Lake-Skardu.jpg";
import lake8 from "../../assets/gallery/lake/Sheosar-Lake-Skardu.jpg";
import lake9 from "../../assets/gallery/lake/Upper-Kachura-Lake.jpg";

// ✅ Rivers
import river1 from "../../assets/gallery/rivers/shyok river.jpg";
import river2 from "../../assets/gallery/rivers/shingo river.jpg";
import river3 from "../../assets/gallery/rivers/shigerriver.jpg";
import river4 from "../../assets/gallery/rivers/73x3hrhiqm29hxr3.jpg";
import river5 from "../../assets/gallery/rivers/ghizer-river.jpg";
import river6 from "../../assets/gallery/rivers/gilgit-river.jpg";
import river7 from "../../assets/gallery/rivers/hunza-river.jpg";
import river8 from "../../assets/gallery/rivers/hushe-river.jpg";

// ✅ Cities
import city1 from "../../assets/gallery/cities/astore.jpeg";
import city2 from "../../assets/gallery/cities/Chilas.jpg";
import city3 from "../../assets/gallery/cities/Danyor.jpg";
import city4 from "../../assets/gallery/cities/Gilgit.jpg";
import city5 from "../../assets/gallery/cities/khaplu-valley-803x490.jpg";
import city6 from "../../assets/gallery/cities/Naltar.jpg";
import city7 from "../../assets/gallery/cities/Skardu.jpg";

// ✅ Culture (fixed spelling ✅)
import culture1 from "../../assets/gallery/cultures/7.jpg";
import culture2 from "../../assets/gallery/cultures/11.jpg";
import culture3 from "../../assets/gallery/cultures/22.jpg";
import culture4 from "../../assets/gallery/cultures/33.jpg";
import culture5 from "../../assets/gallery/cultures/44.jpg";
import culture6 from "../../assets/gallery/cultures/Cover-1440x625-13.jpg";
import culture7 from "../../assets/gallery/cultures/Gilgit-Baltistan-Festival.jpg";
import culture8 from "../../assets/gallery/cultures/Gulmit-Village-Gilgit-17122019-1024x640.jpg";
import culture9 from "../../assets/gallery/cultures/maxresdefault.jpg";

const categories = {
  All: [
    // Mountains
    { src: mountain1, title: "Broad Peak" },
    { src: mountain2, title: "Gasherbrum II" },
    { src: mountain3, title: "Gasherbrum I" },
    { src: mountain4, title: "K2 Mountain" },
    { src: mountain5, title: "Lady Finger Peak" },
    { src: mountain6, title: "Masoor Rock" },
    { src: mountain7, title: "Nanga Parbat" },
    { src: mountain8, title: "Nanga Parbat (2)" },

    // Lakes
    { src: lake1, title: "Blind Lake Skardu" },
    { src: lake2, title: "Borith Lake Hunza" },
    { src: lake3, title: "Naltar Lake" },
    { src: lake4, title: "Phandar Lake" },
    { src: lake5, title: "Rainbow Lake Skardu" },
    { src: lake6, title: "Rush Lake" },
    { src: lake7, title: "Sadpara Lake" },
    { src: lake8, title: "Sheosar Lake" },
    { src: lake9, title: "Upper Kachura Lake" },

    // Rivers
    { src: river1, title: "Shyok River" },
    { src: river2, title: "Shingo River" },
    { src: river3, title: "Shiger River" },
    { src: river4, title: "River View" },
    { src: river5, title: "Ghizer River" },
    { src: river6, title: "Gilgit River" },
    { src: river7, title: "Hunza River" },
    { src: river8, title: "Hushe River" },

    // Cities
    { src: city1, title: "Astore" },
    { src: city2, title: "Chilas" },
    { src: city3, title: "Danyor" },
    { src: city4, title: "Gilgit" },
    { src: city5, title: "Khaplu" },
    { src: city6, title: "Naltar" },
    { src: city7, title: "Skardu" },

    // Culture
    { src: culture1, title: "Traditional Dance" },
    { src: culture2, title: "Local Handicrafts" },
    { src: culture3, title: "Traditional Culture" },
    { src: culture4, title: "Cultural Heritage" },
    { src: culture5, title: "Baltistan Culture" },
    { src: culture6, title: "Cultural Festival" },
    { src: culture7, title: "GB Festival" },
    { src: culture8, title: "Gulmit Village" },
    { src: culture9, title: "Traditional Clothing" },
  ],

  Mountains: [
    { src: mountain1, title: "Broad Peak" },
    { src: mountain2, title: "Gasherbrum II" },
    { src: mountain3, title: "Gasherbrum I" },
    { src: mountain4, title: "K2" },
    { src: mountain5, title: "Lady Finger" },
    { src: mountain6, title: "Masoor Rock" },
    { src: mountain7, title: "Nanga Parbat" },
  ],

  Lakes: [
    { src: lake1, title: "Blind Lake" },
    { src: lake2, title: "Borith Lake" },
    { src: lake3, title: "Naltar Lake" },
    { src: lake4, title: "Phandar Lake" },
    { src: lake5, title: "Rainbow Lake" },
    { src: lake6, title: "Rush Lake" },
    { src: lake7, title: "Sadpara Lake" },
    { src: lake8, title: "Sheosar Lake" },
    { src: lake9, title: "Upper Kachura" },
  ],

  Rivers: [
    { src: river1, title: "Shyok River" },
    { src: river2, title: "Shingo River" },
    { src: river3, title: "Shiger River" },
    { src: river4, title: "River View" },
    { src: river5, title: "Ghizer River" },
    { src: river6, title: "Gilgit River" },
    { src: river7, title: "Hunza River" },
    { src: river8, title: "Hushe River" },
  ],

  Cities: [
    { src: city1, title: "Astore" },
    { src: city2, title: "Chilas" },
    { src: city3, title: "Danyor" },
    { src: city4, title: "Gilgit" },
    { src: city5, title: "Khaplu" },
    { src: city6, title: "Naltar" },
    { src: city7, title: "Skardu" },
  ],

  Culture: [
    { src: culture1, title: "Traditional Dance" },
    { src: culture2, title: "Local Handicrafts" },
    { src: culture3, title: "Traditional Culture" },
    { src: culture4, title: "Cultural Heritage" },
    { src: culture5, title: "Baltistan Culture" },
    { src: culture6, title: "Cultural Festival" },
    { src: culture7, title: "GB Festival" },
    { src: culture8, title: "Village Atmosphere" },
    { src: culture9, title: "Traditional Clothing" },
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

      <div className="gallery-grid">
        {categories[selectedCategory].map((img, index) => (
          <div key={index} className="gallery-card">
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
