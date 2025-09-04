import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [isMenuOpen, setMenuIsOpen] = useState(false);
  const [isLoginOpen, setLoginIsOpen] = useState(false);

  return (
    <nav>
      <button
        className="navigation-menu-button"
        onClick={() => setMenuIsOpen(!isMenuOpen)}
      >
        <img src="./menu.png" alt="toggle menu button" />
      </button>

      <div className={`navigation-wrapper ${isMenuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/opportunities">Opportunities</Link>
        <Link to="/messaging">Messaging</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      <button
        className="login-menu-button"
        onClick={() => setLoginIsOpen(!isLoginOpen)}
      >
        <img src="./profile.png" alt="toggle profile button" />
      </button>

      <div className={`login-wrapper ${isLoginOpen ? "active" : ""}`}>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Header;
