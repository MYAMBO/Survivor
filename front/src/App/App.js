import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";

import Catalogue from "../Catalogue/Catalogue";
import Messaging from "../Startup Area/Messaging/Messaging";
import Opportunities from "../Startup Area/Opportunities/Opportunities";
import Dashboard from "../Startup Area/Dashboard/Dashboard";
import Profile from "../Startup Area/Profile/Profile";
import Calendar from "../Calendar/Calendar";
import Header from "../Header/Header";
import SignUp from "../Log/Signup";
import Login from "../Log/Login";
import Home from "../Home/Home";
import "./App.css";

//
// ---------- AUTH SETUP ----------
//
const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include", // if you use cookies
        });
        const data = await res.json();
        if (!data.error) {
          setUser(data); // backend should return { id, name, role }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//
// ---------- ROUTE PROTECTION ----------
//
function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

//
// ---------- HEADER WRAPPER ----------
//
function HeaderWrapper() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/signup"];
  return hideHeaderPaths.includes(location.pathname) ? null : <Header />;
}

//
// ---------- MAIN APP ----------
//

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderWrapper/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/catalog' element={<Catalogue/>}/>
          <Route path='/calendar' element={<Calendar/>}/>

          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        
          <Route path='/profile' element={
            <PrivateRoute roles={["admin", "user"]}>
              <Profile/>
            </PrivateRoute>
          }/>

          <Route path='/dashboard' element={
            <PrivateRoute roles={["admin", "user"]}>
              <Dashboard/>
            </PrivateRoute>
          }/>
          <Route path='/messaging' element={
            <PrivateRoute roles={["admin", "user"]}>
              <Messaging/>
            </PrivateRoute>
          }/>
          <Route path='/opportunities' element={
            <PrivateRoute roles={["admin", "user"]}>
              <Opportunities/>
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


