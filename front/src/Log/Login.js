import { Link } from "react-router-dom";
import { useState } from "react";
import bcrypt from 'bcryptjs';
import "./Login.css";
import "../Base.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const hashedPassword = bcrypt.hashSync(password, 10);  
        fetch("http://localhost/:3000/login", {
            method: "POST",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password: hashedPassword
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log("Inscription réussie :", data);
        })
        .catch(err => {
            console.error("Erreur :", err);
        });
    };

    return (
        <div className="login-container">
            <div className="back-home">
                <Link to="/" className="home-button-text"> Back to Home </Link>
                <Link to="/" className="home-button-img"> <img src="./home.png" alt="Home Button"/> </Link>
            </div>
            <div>
                <img src="logo.png" alt="Website Logo" className="logo-image"/>
            </div>
            <div className="login-header">
                <h2>Log In</h2>
            </div>
            <div className="login-form-section">
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
                </form>
                <button className="login-form-button">Submit</button>
            </div>
            <p className="signup-link">
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
        </div>
    );
}

export default Login;
