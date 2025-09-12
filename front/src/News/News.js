import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "../Startup Area/Catalogue/Catalogue.css";
import "../Base.css";
import "./News.css";


function News() {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/news", {
      method: "GET",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => (res.status === 401 ? [] : res.json()))
      .then((data) => (Array.isArray(data) ? setNewsList(data) : setNewsList([])))
      .catch((err) => {
        console.error("Erreur fetch news:", err);
        setNewsList([]);
      });
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelectedNews(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = selectedNews ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedNews]);

  const handleCardClick = async (news) => {
    try {
      setLoadingDetails(true);
      setSelectedNews(news);
    } catch (err) {
      console.error("Erreur chargement détails:", err);
      setSelectedNews(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="catalogue-container">
      <h2>News</h2>

      <div className="ag-format-container">
        <div className="ag-courses_box">
          {newsList.length > 0 ? (
            newsList.map((n) => (
              <div
                key={n.id}
                className="ag-courses_item"
                onClick={() => handleCardClick(n)}
                style={{ cursor: "pointer" }}
              >
                <div className="ag-courses-item_link">
                  <div className="ag-courses-item_bg"></div>
                  <div className="ag-courses-item_title">{n.title}</div>
                  <div className="ag-courses-item_date-box">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(n.news_date).toLocaleDateString()}
                    </p>
                    <img
                        src={`data:image/jpeg;base64,${n.image}`}
                        alt={n.title}
                        className="modal-image"
                    />
                    {n.summary && (
                      <p>
                        <strong>Summary:</strong> {n.summary}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>No news available.</p>
          )}
        </div>
      </div>

      {selectedNews && (
        <div
          className="global-modal-overlay"
          onClick={() => setSelectedNews(null)}
        >
          <div className="global-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedNews(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-header">
              <h3>{selectedNews.title}</h3>
            </div>

            <div className="modal-body">
              {loadingDetails ? (
                <p>Chargement...</p>
              ) : (
                <div className="news-card">
                  {selectedNews.image && (
                    <div className="news-card-image">
                      <img
                        src={`data:image/jpeg;base64,${selectedNews.image}`}
                        alt={selectedNews.title}
                      />
                    </div>
                  )}
                  <div className="news-card-content">
                    <h2 className="news-card-title">{selectedNews.title}</h2>

                    <div className="news-card-meta">
                      <span>
                        📅 {new Date(selectedNews.news_date).toLocaleDateString()}
                      </span>
                      <span>📍 {selectedNews.location}</span>
                      <span>🏷 {selectedNews.category}</span>
                    </div>

                    <div className="news-card-description">
                      <ReactMarkdown>{selectedNews.description}</ReactMarkdown>
                    </div>

                    {selectedNews.author && (
                      <p className="news-card-author">
                        ✍️ <strong>{selectedNews.author}</strong>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// location  category 

export default News;
