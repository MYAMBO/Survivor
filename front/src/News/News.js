import React, { useEffect, useState } from "react";
import "./News.css";

function NewsCard({ news, onClick }) {
  return (
    <div
      className="news-card"
      onClick={() => onClick(news)}
      style={{ cursor: "pointer" }}
    >
      <div className="news-card-bg"></div>
      <h3 className="news-card-title">{news.title}</h3>
      <p className="news-card-date">
        <strong>Date:</strong> {new Date(news.date).toLocaleDateString()}
      </p>
      <p className="news-card-summary">{news.summary}</p>
    </div>
  );
}

function News() {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

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

  return (
    <div className="news-wrapper">
      <div className="news-section">
        <div className="news-title">
          <span>NEWS</span>
        </div>

        <ul className="news-list">
          {newsList.length > 0 ? (
            newsList.map((n) => (
              <li key={n.id}>
                <NewsCard news={n} onClick={setSelectedNews} />
              </li>
            ))
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>
              No news available.
            </p>
          )}
        </ul>
      </div>

      {selectedNews && (
        <div
          className="global-modal-overlay"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="global-modal"
            onClick={(e) => e.stopPropagation()}
          >
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
              {selectedNews.image && (
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="modal-image"
                />
              )}
              <div className="modal-info">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedNews.date).toLocaleDateString()}
                </p>
                {selectedNews.author && (
                  <p>
                    <strong>Author:</strong> {selectedNews.author}
                  </p>
                )}
                <p>{selectedNews.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
