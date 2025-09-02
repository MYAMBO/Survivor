import { Link } from "react-router-dom";
import './Header.css'

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/calendar">Calendar</Link>
    </nav>
  );
}

export default Header;
