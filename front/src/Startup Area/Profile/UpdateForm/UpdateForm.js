import React, { useEffect, useState } from "react";
import "./UpdateForm.css";

const Popup = ({ id, active, setActive }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/startups/profile', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error("Erreur:", err.message));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleValidate = () => {
    fetch('http://localhost:3000/modifyStartup', {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error("Erreur:", err.message));

    setActive(false);
  };

  return (
    <div className={active ? "popup-overlay" : "hidden-popup-overlay"}>
      <div className="popup-container">
        <h2>Edit Data</h2>
        <form className="edit-wrapper">
          <span>Address</span>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
          <span>Description</span>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
          <span>Email</span>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          <span>Legal Status</span>
          <input type="text" name="legal_status" value={formData.legal_status} onChange={handleChange} />
          <span>Name</span>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <span>Needs</span>
          <input type="text" name="needs" value={formData.needs} onChange={handleChange} />
          <span>Phone</span>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          <span>Project Status</span>
          <input type="text" name="project_status" value={formData.project_status} onChange={handleChange} />
          <span>Sector</span>
          <input type="text" name="sector" value={formData.sector} onChange={handleChange} />
          <span>social Media</span>
          <input type="text" name="social_media_url" value={formData.social_media_url} onChange={handleChange} />
          <span>Website</span>
          <input type="text" name="website_url" value={formData.website_url} onChange={handleChange} />
        </form>
        <div className="popup-actions">
          <button className="form-popup-close" onClick={() => setActive(false)}>Close</button>
          <button className="form-popup-validate" onClick={handleValidate}>Validate</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
