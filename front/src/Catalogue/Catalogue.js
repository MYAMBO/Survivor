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
  },
  {
    id: 4,
    name: "MediLink",
    sector: "HealthTech",
    maturity: "Series B",
    email: "contact@medilink.com"
  },
  {
    id: 5,
    name: "AgroNext",
    sector: "AgriTech",
    maturity: "Seed",
    email: "team@agronext.com"
  },
  {
    id: 6,
    name: "SkyChain",
    sector: "Blockchain",
    maturity: "Series A",
    email: "info@skychain.com"
  }
];

function Catalogue() {
  return (
    <div className="catalogue-container">
      <h2>Startup Catalog</h2>

      <div className="ag-format-container">
        <div className="ag-courses_box">
          {startups.map((startup, index) => (
            <div key={startup.id} className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">{startup.name}</div>

                <div className="ag-courses-item_date-box">
                  <p>
                    <strong>Sector:</strong> {startup.sector}
                  </p>
                  <p>
                    <strong>Maturity:</strong> {startup.maturity}
                  </p>
                  <p>
                    <strong>Email:</strong> {startup.email}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
