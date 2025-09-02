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
                <Link to="/" className="home-button"> Back to Home </Link>
            </div>
            <div className="website-logo">
                <img src="logo.png" alt="Website Logo" className="logo-image"/>
            </div>
            <h2>Log in</h2>
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
