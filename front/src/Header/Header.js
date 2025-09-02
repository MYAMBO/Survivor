import { Link } from "react-router-dom";
import './Header.css'

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
    </nav>
  );
}

export default Header;
