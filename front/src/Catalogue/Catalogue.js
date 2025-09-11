import React, { useState, useEffect } from "react";
import "./Catalogue.css";
import "../Base.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Catalogue() {
  const [filters, setFilters] = useState({ maturity: "", location: "", sector: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const role = localStorage.getItem("role") || "none";

  useEffect(() => {
    fetch("http://localhost:3000/startups", {
      method: "GET",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => (res.status === 401 ? [] : res.json()))
      .then((data) => (Array.isArray(data) ? setStartups(data) : setStartups([])))
      .catch((err) => {
        console.error("Erreur fetch:", err);
        setStartups([]);
      });
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelectedStartup(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = selectedStartup ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedStartup]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredStartups = startups.filter((s) => {
    const matchesFilters =
      (filters.maturity === "" || s.maturity === filters.maturity) &&
      (filters.location === "" || s.location.split(" ").pop() === filters.location) &&
      (filters.sector === "" || s.sector === filters.sector);

    return matchesFilters && s.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const uniqueMaturities = [...new Set(startups.map((s) => s.maturity))];
  const uniqueLocations = [...new Set(startups.map((s) => s.location.split(" ").pop()))];
  const uniqueSectors = [...new Set(startups.map((s) => s.sector))];

  const handleCardClick = async (startup) => {
    try {
      setLoadingDetails(true);
      const res = await fetch("http://localhost:3000/startups/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: startup.id }),
      });

      if (!res.ok) throw new Error("Erreur API");
      const data = await res.json();
      setSelectedStartup(data);
    } catch (err) {
      console.error("Erreur chargement détails:", err);
      setSelectedStartup(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const exportPDF = (startup) => {
    if (!startup) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(startup.name || "Startup", 14, 16);

    const data = Object.entries(startup)
      .filter(([key]) => key !== "id")
      .map(([key, value]) => {
        if (key === "founders" && Array.isArray(value)) {
          return [key, value.map(f => f.name).join(", ")];
        }
        return [key, value !== null && value !== undefined ? String(value) : ""];
      });

    autoTable(doc, {
      head: [["Champ", "Valeur"]],
      body: data,
      startY: 24,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [200, 200, 200] }
    });

    doc.save(`${(startup.name || "startup").replace(/\s+/g, "_")}.pdf`);
  };

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
        <select name="maturity" value={filters.maturity} onChange={handleFilterChange}>
          <option value="">All Maturities</option>
          {uniqueMaturities.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <select name="location" value={filters.location} onChange={handleFilterChange}>
          <option value="">All Locations</option>
          {uniqueLocations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
        </select>

        <select name="sector" value={filters.sector} onChange={handleFilterChange}>
          <option value="">All Sectors</option>
          {uniqueSectors.map((sec) => <option key={sec} value={sec}>{sec}</option>)}
        </select>
      </div>

      <div className="ag-format-container">
        <div className="ag-courses_box">
          {filteredStartups.length > 0 ? (
            filteredStartups.map((startup) => (
              <div
                key={startup.id}
                className="ag-courses_item"
                onClick={() => handleCardClick(startup)}
                style={{ cursor: "pointer" }}
              >
                <div className="ag-courses-item_link">
                  <div className="ag-courses-item_bg"></div>
                  <div className="ag-courses-item_title">{startup.name}</div>
                  <div className="ag-courses-item_date-box">
                    <p><strong>Sector:</strong> {startup.sector}</p>
                    <p><strong>Maturity:</strong> {startup.maturity}</p>
                    <p><strong>Location:</strong> {startup.location}</p>
                    {startup.description && <p><strong>Description:</strong> {startup.description}</p>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>No startups match your filters.</p>
          )}
        </div>
      </div>

      {selectedStartup && (
        <div className="global-modal-overlay" onClick={() => setSelectedStartup(null)}>
          <div className="global-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedStartup(null)} aria-label="Close">×</button>

            <div className="modal-header">
              <h3>{selectedStartup.name}</h3>
            </div>

            <div className="modal-body">
              {loadingDetails ? (
                <p>Chargement...</p>
              ) : (
                <div className="modal-info">
                  {Object.entries(selectedStartup)
                    .filter(([key]) => key !== "id")
                    .map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong>{" "}
                        {key === "founders" && Array.isArray(value)
                          ? value.map(f => f.name).join(", ")
                          : String(value)}
                      </p>
                    ))}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-export" onClick={() => exportPDF(selectedStartup)}>
                Export in PDF
              </button>
            </div>
          {role === "investor" && (
            <div className="modal-footer">
              <button
                className="btn-contact"
                onClick={() => {
                  setSelectedStartup(null);
                  fetch("http://localhost:3000/messaging/createConv", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ startupId: selectedStartup.id }),
                  })
                  .then((res) => {
                    if (!res.ok) throw new Error("Failed to create conversation");
                    return res.json();
                  })
                  .then(() => {
                    window.location.href = "/messaging";
                  })
                  .catch((err) => {
                    console.error("Error creating conversation:", err);
                  });
                }}
              >
                Contact
              </button>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalogue;