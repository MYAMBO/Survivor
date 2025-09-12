import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import './Home.css'
import Markdown from "react-markdown";

function PresentationSection () {
  return (
    <section className="presentation">
      <div className="overlay">
        <div className="content">
          <h2>JEB INCUBATOR</h2>
          <p>
            Uniting breakthrough ideas with global capital. We fast-track early-stage startups by providing funding, expertise, and an unparalleled international network.
          </p>
        </div>
      </div>
    </section>
  )
}

function Project({ news }) {
  return (
    <div className="ag-courses_item">
      <a href={news.url || "/news"} className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        {news.image && (
          <img
            src={`data:image/jpeg;base64,${news.image}`}
            alt={news.title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        )}
        <div className="ag-courses-item_title">{news.title}</div>
      </a>
    </div>
  );
}

function FeaturedProjectSection () {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/news", {
      method: "GET",
      headers: { "Accept": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = data.sort(
            (a, b) => new Date(b.news_date) - new Date(a.news_date)
          );
          setLatestNews(sorted.slice(0, 6));
        }
      })
      .catch(err => console.error("Erreur fetch news:", err));
  }, []);

  return (
    <section className="projects">
      <h2>Latest News</h2>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {latestNews.map((n) => (
            <Project key={n.id} news={n} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <div className="home-wrapper">
      <PresentationSection/>
      <FeaturedProjectSection/>
    </div>
  )
}

export default Home;
