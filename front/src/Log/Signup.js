import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function SignUp({ onSignUp }) {
    const [formData, setFormData] = useState({
        name: "",
        legalStatus: "",
        adress: "",
        email: "",
        phoneNumber: "",
        sector: "",
        maturity: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (onSignUp) {
            onSignUp(formData)
        }
    };

    const fields = [
        { name: "name", type: "text", placeholder: "Name" },
        { name: "legalStatus", type: "text", placeholder: "Legal Status" },
        { name: "adress", type: "text", placeholder: "Address" },
        { name: "email", type: "email", placeholder: "Email Address" },
        { name: "phoneNumber", type: "tel", placeholder: "Phone Number" },
        { name: "sector", type: "text", placeholder: "Sector" },
        { name: "maturity", type: "text", placeholder: "Maturity" },
        { name: "password", type: "password", placeholder: "Password" },
        { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
    ];

    return (
        <div className="login-container">
        <div className="back-home">
            <Link to="/" className="home-button">Back to Home</Link>
        </div>
        <div className="website-logo">
            <img src="logo.png" alt="Website Logo" className="logo-image"/>
        </div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="login-form">
            {fields.map(({ name, type, placeholder }) => (
            <input
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required
            />
            ))}
            <button type="submit">Create Account</button>
        </form>
        <p className="signup-link">
            Already have an account? <Link to="/login">Log in</Link>
        </p>
        </div>
  );
}

export default SignUp;
