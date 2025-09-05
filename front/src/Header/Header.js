import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../App/App";
import "./Header.css";

function Header() {
  const [isMenuOpen, setMenuIsOpen] = useState(false);
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const {logout} = useAuth();

  const toggleMenu = () => setMenuIsOpen(prev => !prev);
  const toggleLogin = () => setLoginIsOpen(prev => !prev);
  const closeAllMenus = () => {
    setMenuIsOpen(false);
    setLoginIsOpen(false);
  };

  const logoutAction = () => {
    closeAllMenus();
    logout();
  }

  return (
    <nav>
      <button
        className="navigation-menu-button"
        onClick={toggleMenu}
      >
        <img src="./menu.png" alt="toggle menu button" />
      </button>

      <div className={`navigation-wrapper ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeAllMenus}>Home</Link>
        <Link to="/catalog" onClick={closeAllMenus}>Catalog</Link>
        <Link to="/calendar" onClick={closeAllMenus}>Calendar</Link>
        <Link to="/opportunities" onClick={closeAllMenus}>Opportunities</Link>
        <Link to="/messaging" onClick={closeAllMenus}>Messaging</Link>
        <Link to="/dashboard" onClick={closeAllMenus}>Dashboard</Link>
      </div>

      <button
        className="login-menu-button"
        onClick={toggleLogin}
      >
        <img src="./profile.png" alt="toggle profile button" />
      </button>

      <div className={`login-wrapper ${isLoginOpen ? "active" : ""}`}>
        <Link to="/profile" onClick={closeAllMenus}>Profile</Link>
        <Link to="/signup" onClick={closeAllMenus}>Sign Up</Link>
        <Link to="/login" onClick={closeAllMenus}>Log In</Link>
        <Link to="/" onClick={logoutAction}>Log out</Link>
      </div>
    </nav>
  );
}

export default Header;
