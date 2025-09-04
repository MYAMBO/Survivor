import React, { useState } from "react";
import "./Catalogue.css";
import "../Base.css";

const startups = [
  {
    id: 1,
    name: "TechNova",
    sector: "AI",
    maturity: "Seed",
    location: "New York, USA",
    email: "contact@technova.com"
  },
  {
    id: 2,
    name: "GreenWave",
    sector: "Renewable Energy",
    maturity: "Series A",
    location: "Berlin, Germany",
    email: "info@greenwave.com"
  },
  {
    id: 3,
    name: "Foodify",
    sector: "FoodTech",
    maturity: "Early Stage",
    location: "San Francisco, USA",
    email: "hello@foodify.com"
  },
  {
    id: 4,
    name: "MediLink",
    sector: "HealthTech",
    maturity: "Series B",
    location: "London, UK",
    email: "contact@medilink.com"
  },
  {
    id: 5,
    name: "AgroNext",
    sector: "AgriTech",
    maturity: "Seed",
    location: "Paris, France",
    email: "team@agronext.com"
  },
  {
    id: 6,
    name: "SkyChain",
    sector: "Blockchain",
    maturity: "Series A",
    location: "Tokyo, Japan",
    email: "info@skychain.com"
  },
  {
    id: 7,
    name: "UrbanMove",
    sector: "Mobility",
    maturity: "Early Stage",
    location: "Toronto, Canada",
    email: "zouecbzeocbezc"
  },
  {
    id: 8,
    name: "EcoBuild",
    sector: "ConstructionTech",
    maturity: "Series B",
    location: "Sydney, Australia",
    email: "jbzcbz"
  }
];

function Catalogue() {
  const [filters, setFilters] = useState({
    maturity: "",
    location: "",
    sector: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStartups = startups.filter((s) => {
    return (
      (filters.maturity === "" || s.maturity === filters.maturity) &&
      (filters.location === "" || s.location === filters.location) &&
      (filters.sector === "" || s.sector === filters.sector)
    );
  });

  const uniqueMaturities = [...new Set(startups.map((s) => s.maturity))];
  const uniqueLocations = [...new Set(startups.map((s) => s.location))];
  const uniqueSectors = [...new Set(startups.map((s) => s.sector))];

  return (
    <div className="catalogue-container">
      <h2>Startup Catalog</h2>

      <div className="filters" style={{ textAlign: "center", marginBottom: "20px" }}>
        <select name="maturity" value={filters.maturity} onChange={handleFilterChange}>
          <option value="">All Maturities</option>
          {uniqueMaturities.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select name="location" value={filters.location} onChange={handleFilterChange}>
          <option value="">All Locations</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select name="sector" value={filters.sector} onChange={handleFilterChange}>
          <option value="">All Sectors</option>
          {uniqueSectors.map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>

      <div className="ag-format-container">
        <div className="ag-courses_box">
          {filteredStartups.length > 0 ? (
            filteredStartups.map((startup) => (
              <div key={startup.id} className="ag-courses_item">
                <a href="#" className="ag-courses-item_link">
                  <div className="ag-courses-item_bg"></div>
                  <div className="ag-courses-item_title">{startup.name}</div>
                  <div className="ag-courses-item_date-box">
                    <p><strong>Sector:</strong> {startup.sector}</p>
                    <p><strong>Maturity:</strong> {startup.maturity}</p>
                    <p><strong>Location:</strong> {startup.location}</p>
                    <p><strong>Email:</strong> {startup.email}</p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>No startups match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
