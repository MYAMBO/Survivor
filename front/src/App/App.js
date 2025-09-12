import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Messaging from '../Messaging/Messaging'
import Dashboard from '../Admin Area/Dashboard/Dashboard'
import Profile from '../Startup Area/Profile/Profile'
import Catalogue from '../Startup Area/Catalogue/Catalogue';
import MyCalendar from '../Startup Area/Calendar/Calendar';
import Header from '../Header/Header';
import SignUp from '../Log/Signup';
import Login from '../Log/Login';
import Home from '../Home/Home';
import News from '../News/News';
import './App.css';

function App() {  
  const [role, setRole] = useState('none');

  function HeaderWrapper() {
    const location = useLocation();
    const hideHeaderPaths = ['/login', '/signup'];

    return hideHeaderPaths.includes(location.pathname) ? null : <Header />;
  }

  
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

    return (
      <BrowserRouter>
        <HeaderWrapper/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {role === 'none' && (
            <>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
            </>
          )}
          {(role === 'investor' || role === 'admin' || role === 'founder' || 'none') && (
            <>
              <Route path='/catalog' element={<Catalogue/>}/>
              <Route path='/calendar' element={<MyCalendar/>}/>
              <Route path='/news' element={<News/>}/>
            </>
          )}
          {(role === 'investor' || role === 'admin' || role === 'founder') && (
            <>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/messaging' element={<Messaging/>}/>
            </>
          )}
        </Routes>
      </BrowserRouter>
    );
}

export default App;
