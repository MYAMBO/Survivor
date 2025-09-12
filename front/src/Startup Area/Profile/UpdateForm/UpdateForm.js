import React, { useEffect, useState } from "react";
import "./UpdateForm.css"

const HandleValidate = (data, setActive) => {

    useEffect(() => {
    fetch('http://localhost:3000/modifyStartup', 
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch(err => {
            console.error("Erreur :", err.message);
        });
    }, []);
    
    setActive(false);
}

const Popup = (id, active, setActive) => {
  const [formData, setFormData] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    fetch('http://localhost:3000/startups/profile', 
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": id
            })
        }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFormData(data);
      })
      .catch(err => {
        console.error("Erreur :", err.message);
      });
  }, []);

  return (
    <div className={active ? "popup-overlay" : "hidden-popup-overlay"}>
      <div className="popup-container">
        <h2>Edit Data</h2>
        <form className="edit-wrapper">
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="legal_status"
                value={formData.legal_status}
                onChange={handleChange}
            />
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="needs"
                value={formData.needs}
                onChange={handleChange}
            />
            <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />
            <input
                type="text"
                name="project_status"
                value={formData.project_status}
                onChange={handleChange}
            />
            <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
            />
            <input
                type="text"
                name="social_media_url"
                value={formData.social_media_url}
                onChange={handleChange}
            />
            <input
                type="text"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
            />
        </form>
        <div className="popup-actions">
            <button className="form-popup-close">Close</button>
            <button className="form-popup-validate" onClick={HandleValidate(id, setActive)} >Validate</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

