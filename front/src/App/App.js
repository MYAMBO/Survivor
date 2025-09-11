import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Opportunities from '../Startup Area/Opportunities/Opportunities'
import Messaging from '../Startup Area/Messaging/Messaging'
import Dashboard from '../Startup Area/Dashboard/Dashboard'
import Profile from '../Startup Area/Profile/Profile'
import Catalogue from '../Catalogue/Catalogue';
import Calendar from '../Calendar/Calendar';
import Header from '../Header/Header';
import SignUp from '../Log/Signup';
import Login from '../Log/Login';
import Home from '../Home/Home';
import './App.css';

function App() {  
  const [role, setRole] = useState('none');

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json" },
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) return { role: 'none' }
        return res.json()
      })
      .then(data => {
        if (data && data.role) {
          setRole(data.role);
          localStorage.setItem("role", data.role);
        }
      })
      .catch(err => {
        console.error('Erreur fetch:', err)
        setRole('none')
        localStorage.setItem("role", 'none');
      })
    }, [])

    const hideHeaderPaths = ['/login', '/signup'];
    const currentPath = window.location.pathname;
    const showHeader = !hideHeaderPaths.includes(currentPath);

    return (
      <BrowserRouter>
        {showHeader && <Header />}
        <Routes>
          <Route path='/' element={<Home/>}/>
          {role === 'none' && (
            <>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/catalog' element={<Catalogue/>}/>
              <Route path='/calendar' element={<Calendar/>}/>
            </>
          )}
          {(role === 'investor' || role === 'admin' || role === 'founder') && (
            <>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/messaging' element={<Messaging/>}/>
              <Route path='/opportunities' element={<Opportunities/>}/>
            </>
          )}
          {role === 'admin' && (
            <Route path='/dashboard' element={<Dashboard/>}/>
          )}
        </Routes>
      </BrowserRouter>
    );
}

export default App;
