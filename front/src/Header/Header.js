import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [isMenuOpen, setMenuIsOpen] = useState(false);
  const [isLoginOpen, setLoginIsOpen] = useState(false);

  const role = localStorage.getItem("role") || "none";

  const toggleMenu = () => setMenuIsOpen(prev => !prev);
  const toggleLogin = () => setLoginIsOpen(prev => !prev);
  const closeAllMenus = () => {
    setMenuIsOpen(false);
    setLoginIsOpen(false);
  };

  return (
    <nav>
      <button className="navigation-menu-button" onClick={toggleMenu}>
        <img src="./menu.png" alt="toggle menu button" />
      </button>

      <div className={`navigation-wrapper ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeAllMenus}>Home</Link>
        {(role === "investor" || role === "admin" || role === "founder") && (
          <>
          <Link to="/catalog" onClick={closeAllMenus}>Catalog</Link>
          <Link to="/calendar" onClick={closeAllMenus}>Calendar</Link>
          <Link to="/messaging" onClick={closeAllMenus}>Messaging</Link>
          <Link to="/opportunities" onClick={closeAllMenus}>Opportunities</Link>
          </>
        )}
        {role === "admin" && (
          <Link to="/dashboard" onClick={closeAllMenus}>Dashboard</Link>
        )}
      </div>

      <button className="login-menu-button" onClick={toggleLogin}>
        <img src="./profile.png" alt="toggle profile button" />
      </button>

      <div className={`login-wrapper ${isLoginOpen ? "active" : ""}`}>
        {role === "none" ? (
          <>
            <Link to="/login" onClick={closeAllMenus}>Log In</Link>
            <Link to="/signup" onClick={closeAllMenus}>Sign Up</Link>
          </>
        ) : (
          <>
          <Link to="/profile" onClick={closeAllMenus}>Profile</Link>
            <Link to="/" onClick={() => {
              fetch("http://localhost:3000/logout", {
                method: "GET",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                credentials: 'include'
              })
              .then(res => {
                if (res.status === 200) {
                  localStorage.setItem("role", "none");
                  closeAllMenus();
                  window.location.href = "/";
                } else {
                  throw new Error('Logout failed');
                }
              })
              .catch(err => {
                console.error('Erreur lors de la déconnexion :', err);
              });
              }}>Sign Out</Link>
            </>
        )}
      </div>
    </nav>
  );
}

export default Header;
