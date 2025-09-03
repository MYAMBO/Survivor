import React from "react";
import "./Catalogue.css";
import "../Base.css";

const startups = [
  {
    id: 1,
    name: "TechNova",
    sector: "AI",
    maturity: "Seed",
    email: "contact@technova.com"
  },
  {
    id: 2,
    name: "GreenWave",
    sector: "Renewable Energy",
    maturity: "Series A",
    email: "info@greenwave.com"
  },
  {
    id: 3,
    name: "Foodify",
    sector: "FoodTech",
    maturity: "Early Stage",
    email: "hello@foodify.com"
  }
];

function Catalogue() {
  return (
    <div className="catalogue-container">
      <h2>Startup Catalogue</h2>
      <div className="startup-grid">
        {startups.map((startup) => (
          <div key={startup.id} className="startup-card">
            <h3>{startup.name}</h3>
            <p><strong>Sector:</strong> {startup.sector}</p>
            <p><strong>Maturity:</strong> {startup.maturity}</p>
            <p><strong>Email:</strong> {startup.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;
