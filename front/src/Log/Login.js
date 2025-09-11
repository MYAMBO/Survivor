import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchAndStoreRole } from "./Signup";
import "./Login.css";
import "../Base.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email":email,
                "password":password
            }),
            credentials: 'include'
        })
        .then(async res => {
            const data = await res.json();
        
            if (!res.ok) {
                throw new Error(data.message);
            }
            if (data.error) {
                throw new Error(data.error);
            }
            return data;
        })
        .then(data => {
            console.log("Inscription réussie :", data);
            if (onLogin) Login(data);
            fetchAndStoreRole();
            navigate("/");
            window.location.reload(true);
            
        })
        .catch(err => {
            console.error("Erreur :", err.message);
            setError(err.message);
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
                    <button type="submit" className="login-form-button">Submit</button>
                </form>
            </div>
            <p className="signup-link">
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
            {error && (
            <div className="popup-overlay">
                <div className="popup">
                <h3>Error</h3>
                <p>{error}</p>
                <button onClick={() => setError(false)}>Ok</button>
                </div>
            </div>
            )}
        </div>
    );
}

export default Login;
