import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Wheel from "./Wheel";
import UserItem from "./UserItem/UserItem";

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) return [];
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Données reçues invalides :", data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch:", err);
        setUsers([]);
      });
  }, []);

  return [users, setUsers];
}

function Dashboard() {
  const [loading] = useState(false);
  const [startups, setStartups] = useState([]);
  const [users, setUsers] = useUsers();

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

  const [buttonloading, setButtonLoading] = useState(false);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  const total = startups.length;

  const buildSlices = (key) => {
    const counts = startups.reduce((acc, s) => {
      let value = s[key] || "Unknown";
  
      if (key === "location") {
        const parts = value.trim().split(" ");
        value = parts[parts.length - 1];
      }
      value = value.trim().toLowerCase();
      value = value.charAt(0).toUpperCase() + value.slice(1);
  
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  
    const stats = Object.entries(counts).map(([label, count]) => ({
      label,
      count,
      percent: ((count / total) * 100).toFixed(1),
    }));
  
    const slices = stats.map((st, idx) => ({
      label: st.label,
      percent: Number(st.percent),
      color: ['#ff6b6b','#ffd166','#06d6a0','#118ab2','#9b5de5','#ef476f'][idx % 6]
    }));
  
    return { stats, slices };
  };  

  const { slices: maturitySlices } = buildSlices("maturity");
  const { slices: sectorSlices } = buildSlices("sector");
  const { slices: countrySlices } = buildSlices("location");


  const launchMigration = async () => {
    setButtonLoading(true);
    try {
      const res = await fetch("http://localhost:3000/migration", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        alert("Migration started successfully.");
      } else {
        alert("Failed to start migration.");
      }
    } catch (err) {
      console.error("Erreur fetch:", err);
      alert("Error starting migration.");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="title-wrapper">
        <h2>Dashboard</h2>
      </div>
      <div className="section-wrapper">
        <div className="startup-section">
          <h3>By Maturity</h3>
          <Wheel slices={maturitySlices} centerLabel={total} />
        </div>
        <div className="startup-section">
          <h3>By Sector</h3>
          <Wheel slices={sectorSlices} centerLabel={total} />
        </div>
        <div className="startup-section">
          <h3>By Country</h3>
          <Wheel slices={countrySlices} centerLabel={total} />
        </div>
        <button className={`button-migration ${loading ? "disabled" : ""}`} onClick={launchMigration} disabled={loading}>
          {buttonloading ? "Loading..." : "Launch Migration"}
        </button>
      </div>
      <div className="user-wrapper">
        <ul className="user-list" style={{ listStyle: "none", padding: 0 }}>
          {users.map((user, index) => (
            <UserItem key={index} user={user} 
            onUserDeleted={(id) => setUsers((prev) => prev.filter((u) => u.id !== id))}/>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
