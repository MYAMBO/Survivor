import React, { useState, useEffect } from "react";
import "./Catalogue.css";
import "../../Base.css";

function Catalogue() {
  const [filters, setFilters] = useState({
    maturity: "",
    location: "",
    sector: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/startups", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json" },
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) return [];
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setStartups(data);
        } else {
          console.error("Données reçues invalides :", data);
          setStartups([]);
        }
      })
      .catch(err => {
        console.error("Erreur fetch:", err);
        setStartups([]);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStartups = startups.filter((s) => {
    const matchesFilters =
      (filters.maturity === "" || s.maturity === filters.maturity) &&
      (filters.location === "" ||  s.location.split(" ").pop() === filters.location) &&
      (filters.sector === "" || s.sector === filters.sector);

    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilters && matchesSearch;
  });

  const uniqueMaturities = [...new Set(startups.map((s) => s.maturity))];
  const uniqueLocations = [...new Set(startups.map((s) => s.location))];
  const uniqueSectors = [...new Set(startups.map((s) => s.sector))];

  for (let i = 0; i < uniqueLocations.length; i++) {
    const parts = uniqueLocations[i].split(" ");
    uniqueLocations[i] = parts[parts.length - 1];
  }
  const trimedLocations = [];
  for (let i = 0; i < uniqueLocations.length; i++) {
    for (let j = 0; j < trimedLocations.length; j++) {
      if (uniqueLocations[i] === trimedLocations[j]) break;
      if (j === trimedLocations.length - 1) trimedLocations.push(uniqueLocations[i]);
    }
    if (trimedLocations.length === 0) trimedLocations.push(uniqueLocations[i]);
  }

  return (
    <div className="catalogue-container">
      <h2>Startup Catalog</h2>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="filters" style={{ textAlign: "center", marginBottom: "20px" }}>
        <br />
        <select name="maturity" value={filters.maturity} onChange={handleFilterChange}>
          <option value="">All Maturities</option>
          {uniqueMaturities.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select name="location" value={filters.location} onChange={handleFilterChange}>
          <option value="">All Locations</option>
          {trimedLocations.map((loc) => (
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
                    {Object.entries(startup).map(([key, value]) => (
                      !["id","name","sector","maturity","location","email"].includes(key) && (
                        <p key={key}><strong>{key}:</strong> {String(value)}</p>
                      )
                    ))}
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
