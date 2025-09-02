import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onLogin) {
            onLogin({ email, password });
        }
    };

    return (
        <div className="login-container">
            <div className="back-home">
                <Link to="/" className="home-button-text"> Back to Home </Link>
                <Link to="/" className="home-button-img"> <img src="./home.png" alt="Home Button"/> </Link>
            </div>
            <div className="website-logo">
                <img src="logo.png" alt="Website Logo" className="logo-image"/>
            </div>
            <div className="login-header">
                <h2>Log In</h2>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email Adress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <p className="signup-link">
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
        </div>
    );
}

export default Login;
