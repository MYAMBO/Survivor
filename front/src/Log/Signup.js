import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";
import "./Login.css";
import "./Popup.css";

export async function fetchAndStoreRole() {
    try {
      const res = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
  
      if (res.status === 401) {
        localStorage.setItem("role", "none");
        return "none";
      }
  
      const data = await res.json();
      if (data && data.role) {
        localStorage.setItem("role", data.role);
        return data.role;
      }
  
      localStorage.setItem("role", "none");
      return "none";
    } catch (err) {
      console.error("Erreur fetch:", err);
      localStorage.setItem("role", "none");
      return "none";
    }
  }
  

  function SignUp({ onSignUp }) {
    const [isFunder, setIsFunder] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name : "",
      email: "",
      role : "",
      password: "",
      confirmPassword: ""
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
  
      fetch("http://localhost:3000/createUser", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Erreur inconnue");
          if (data.error) throw new Error(data.error);
          return data;
        })
        .then(async data => {
          console.log("Inscription réussie :", data);
          const loginRes = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              email: formData.email,
              password: formData.password
            })
          });
          if (!loginRes.ok) throw new Error("Échec de la connexion automatique");
          await fetchAndStoreRole();
          navigate("/");
          window.location.reload();
        })
        
        .catch(err => {
          console.error("Erreur :", err.message);
          setError(err.message);
        });
    };
  
    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const user_fields = [
        { name: "name", type: "text", placeholder: "Name" },
        { name: "email", type: "email", placeholder: "Email Address" },
        { name: "password", type: "password", placeholder: "Password" },
        { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
    ];

    return (
        <div className={`login-container ${isFunder ? "founder-bg" : "investor-bg"}`}>
            <div className="back-home">
                <Link to="/" className="home-button-text">Back to Home</Link>
                <Link to="/" className="home-button-img"> <img src="./home.png" alt="Home Button"/> </Link>
            </div>
            <img src="logo.png" alt="Website Logo" className="logo-image"/>
            <h2>Sign Up</h2>
            <div className="toggle-container">
                <div className={`slider ${isFunder ? "right" : "left"}`}>
                </div>
                <button
                    type="button"
                    className={!isFunder ? "active" : ""}
                    onClick={() => setIsFunder(false)}
                >
                    Investor
                </button>
                <button
                    type="button"
                    className={isFunder ? "active" : ""}
                    onClick={() => setIsFunder(true)}
                >
                    Founder
                </button>
            </div>
            {isFunder ? (formData.role = "founder",
                <form onSubmit={handleSubmit} className="signup-form">
                    {user_fields.map(({ name, type, placeholder }) => (
                        <input
                            key={name}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            value={formData[name]}
                            onChange={handleChangeUser}
                            required
                        />
                    ))}
                    <button type="submit">Create User Account</button>
                </form>
            ) : (
                formData.role = "investor",
                <form onSubmit={handleSubmit} className="signup-form">
                    {user_fields.map(({ name, type, placeholder }) => (
                        <input
                            key={name}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            value={formData[name]}
                            onChange={handleChangeUser}
                            required
                        />
                    ))}
                    <button type="submit">Create User Account</button>
                </form>
            )}
            <p className="signup-link">
                Already have an account? <Link to="/login">Log in</Link>
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

export default SignUp;


/*
    const handleSubmitStartup = (e) => {
        e.preventDefault();
      
        if (formDataStartup.password !== formDataStartup.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
    
        const hashedPassword = bcrypt.hashSync(formDataStartup.password, 10);  
        fetch("http://10.17.71.123:3000/createStartup", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            password: hashedPassword
          }),
        })
        .then(res => res.json())
        .then(data => {console.log("Inscription réussie :", data);})
        .catch(err => {console.error("Erreur :", err);});
    };

        const [formDataStartup, setFormDataStartup] = useState({
        name: "",
        legal_status: "",
        address: "",
        email: "",
        phone: "",
        sector: "",
        maturity: "",
        password: "",
        confirmPassword: ""
    });
    const handleChangeStartup = (e) => {
        const { name, value } = e.target;
        setFormDataStartup((prev) => ({ ...prev, [name]: value }));
    };    const startup_fields = [
        { name: "name", type: "text", placeholder: "Name" },
        { name: "legal_status", type: "text", placeholder: "Legal Status" },
        { name: "address", type: "text", placeholder: "Address" },
        { name: "email", type: "email", placeholder: "Email Address" },
        { name: "phone", type: "tel", placeholder: "Phone Number" },
        { name: "sector", type: "text", placeholder: "Sector" },
        { name: "maturity", type: "text", placeholder: "Maturity" },
        { name: "password", type: "password", placeholder: "Password" },
        { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
    ];

    */