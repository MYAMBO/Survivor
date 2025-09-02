import { useState } from "react";
import "./Login.css";

function SignUp({ onSignUp }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (onSignUp) {
            onSignUp({ name, email, password });
        }
    };

    return (
        <div className="login-container">
            <div className="back-home">
                <button href="/">Back to Home</button>
            </div>
            <div className="website-logo">
                <img src="logo.png" alt="Website Logo" className="logo-image"/>
            </div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Create Account</button>
            </form>
            <p className="signup-link">
                Already have an account? <a href="/login">Log in</a>
            </p>
        </div>
    );
}

export default SignUp;
