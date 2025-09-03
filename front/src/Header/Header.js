import { Link } from "react-router-dom";
import './Header.css'

function Header() {
  return (
    <nav>
      <button className="navigation-menu-button">
        <img src="./menu.png" alt="Menu button"/>
      </button>
      <div className="navigation-wrapper">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/opportunities">Opportunities</Link>
        <Link to="/messaging">Messaging</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <button className="login-menu-button">
        <img src="./profile.png" alt="Profile button"/>
      </button>
      <div className="login-wrapper">
        <Link to="/profile">Profile</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    </nav>
  );
}

export default Header;
