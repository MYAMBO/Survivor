import React, { useState, useEffect } from "react";
import "./Catalogue.css";
import "../Base.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Catalogue() {
  const [filters, setFilters] = useState({
    maturity: "",
    location: "",
    sector: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [startups, setStartups] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null); // id de la startup sélectionnée

  useEffect(() => {
    fetch("http://localhost:3000/startups", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => (res.status === 401 ? [] : res.json()))
      .then((data) => (Array.isArray(data) ? setStartups(data) : setStartups([])))
      .catch((err) => {
        console.error("Erreur fetch:", err);
        setStartups([]);
      });
  }, []);

  // fermer au Escape & bloquer scroll quand modal ouverte
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveCardId(null);
    };
    document.addEventListener("keydown", onKey);
    if (activeCardId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeCardId]);

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

    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilters && matchesSearch;
  });

  // données uniques pour selects (inchangé)
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

  const handleCardClick = (startup) => {
    // on ne change pas la structure HTML des cards — juste on ouvre notre popup global
    setActiveCardId(startup.id);
  };

  const handleCloseModal = () => setActiveCardId(null);

  const selectedStartup = startups.find((s) => s.id === activeCardId) || null;

  const exportPDF = (startup) => {
    if (!startup) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(startup.name || "Startup", 14, 16);

    const data = Object.entries(startup)
      .filter(([k]) => !["id", "image"].includes(k))
      .map(([k, v]) => [k, String(v === null || v === undefined ? "" : v)]);

    doc.autoTable({
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
        <br />
        <select name="maturity" value={filters.maturity} onChange={handleFilterChange}>
          <option value="">All Maturities</option>
          {uniqueMaturities.map((m) => (<option key={m} value={m}>{m}</option>))}
        </select>

        <select name="location" value={filters.location} onChange={handleFilterChange}>
          <option value="">All Locations</option>
          {trimedLocations.map((loc) => (<option key={loc} value={loc}>{loc}</option>))}
        </select>

        <select name="sector" value={filters.sector} onChange={handleFilterChange}>
          <option value="">All Sectors</option>
          {uniqueSectors.map((sec) => (<option key={sec} value={sec}>{sec}</option>))}
        </select>
      </div>

      <div className="ag-format-container">
        <div className="ag-courses_box">
          {filteredStartups.length > 0 ? (
            filteredStartups.map((startup) => (
              // LA CARD : structure inchangée (seul on ajoute un onClick sur la wrapper)
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
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>No startups match your filters.</p>
          )}
        </div>
      </div>

      {/* POPUP GLOBAL (séparée — NE PAS mettre dans la card) */}
      {selectedStartup && (
        <div className="global-modal-overlay" onClick={handleCloseModal}>
          <div className="global-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal} aria-label="Close">×</button>

            <div className="modal-header">
              <h3>{selectedStartup.name}</h3>
            </div>

            <div className="modal-body">
              {selectedStartup.image ? (
                <img src={selectedStartup.image} alt={selectedStartup.name} className="modal-image" />
              ) : (
                <div className="modal-image placeholder">No image</div>
              )}

              <div className="modal-info">
                <p><strong>Sector:</strong> {selectedStartup.sector}</p>
                <p><strong>Maturity:</strong> {selectedStartup.maturity}</p>
                <p><strong>Location:</strong> {selectedStartup.location}</p>
                {selectedStartup.description && (
                  <p><strong>Description:</strong> {selectedStartup.description}</p>
                )}

                {Object.entries(selectedStartup).map(([key, value]) =>
                  !["id","name","sector","maturity","location","description","image","email"].includes(key) ? (
                    <p key={key}><strong>{key}:</strong> {String(value)}</p>
                  ) : null
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-export" onClick={() => exportPDF(selectedStartup)}>
                Exporter en PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalogue;
