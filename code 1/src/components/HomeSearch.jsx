import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomeSearch.css";

const HomeSearch = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("bodyParts");
  const navigate = useNavigate();

  const bodyParts = ["chest", "legs", "back", "shoulders", "arms"];
  const equipment = ["dumbbell", "barbell", "body weight", "machine"];

  const popularCategories = [
    { name: "Chest", type: "bodyPart" },
    { name: "Legs", type: "bodyPart" },
    { name: "Back", type: "bodyPart" },
    { name: "Shoulders", type: "bodyPart" },
    { name: "Dumbbell", type: "equipment" },
    { name: "Barbell", type: "equipment" },
  ];

  const handleSearch = (term) => {
    if (term) navigate(`/search/${term.toLowerCase()}`);
  };

  return (
    <div className="home-search-component">
      <h3>Find Your Perfect Exercise</h3>

      {/* Category Selection Buttons */}
      <div className="category-buttons">
        <button
          className={selectedCategory === "bodyParts" ? "active" : ""}
          onClick={() => setSelectedCategory("bodyParts")}
        >
          Body Parts
        </button>
        <button
          className={selectedCategory === "equipment" ? "active" : ""}
          onClick={() => setSelectedCategory("equipment")}
        >
          Equipment
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <select
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        >
          <option value="">Select {selectedCategory === "bodyParts" ? "Body Part" : "Equipment"}</option>
          {(selectedCategory === "bodyParts" ? bodyParts : equipment).map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </select>
        <button onClick={() => handleSearch(query)}>Search</button>
      </div>

      {/* Popular Categories */}
      <div className="popular-categories-container">
        <h5>🔥 Popular Categories</h5>
        <div className="popular-categories">
          {popularCategories.map((cat, idx) => (
            <div
              key={idx}
              className="popular-category"
              onClick={() => handleSearch(cat.name)}
            >
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Body Parts / Equipment */}
      <div className="popular-items">
        <h5>Popular {selectedCategory === "bodyParts" ? "Body Parts" : "Equipment"}</h5>
        <div className="popular-list">
          {(selectedCategory === "bodyParts" ? bodyParts : equipment).map((item, idx) => (
            <span key={idx} onClick={() => handleSearch(item)}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
