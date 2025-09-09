import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/startups", {
      method: "GET",
      headers: {
        "Accept": "application/json",
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
          setStartups(data);
        } else {
          console.error("Invalid data:", data);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  const total = startups.length;

  const maturityCounts = startups.reduce((acc, s) => {
    acc[s.maturity] = (acc[s.maturity] || 0) + 1;
    return acc;
  }, {});

  const maturityStats = Object.entries(maturityCounts).map(([maturity, count]) => ({
    maturity,
    count,
    percent: ((count / total) * 100).toFixed(1),
  }));

  return (
    <div className="dashboard">
      <div className="corner-band">In Development</div>

      <h2>Dashboard</h2>
      <p><strong>Total startups:</strong> {total}</p>

      <h3>By Maturity</h3>
      <ul>
        {maturityStats.map((stat) => (
          <li key={stat.maturity}>
            <strong>{stat.maturity}:</strong> {stat.count} startups ({stat.percent}%)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
