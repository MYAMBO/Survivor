import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'

import Catalogue from '../Catalogue/Catalogue';
import Messaging from '../Startup Area/Messaging/Messaging'
import Opportunities from '../Startup Area/Opportunities/Opportunities'
import Dashboard from '../Startup Area/Dashboard/Dashboard'
import Profile from '../Startup Area/Profile/Profile'
import MyCalendar from '../Calendar/Calendar';
import Header from '../Header/Header';
import SignUp from '../Log/Signup';
import Login from '../Log/Login';
import Home from '../Home/Home';
import './App.css';

function HeaderWrapper() {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/signup'];

  return hideHeaderPaths.includes(location.pathname) ? null : <Header />;
}

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
        if (data && data.role) setRole(data.role)
      })
      .catch(err => {
        console.error('Erreur fetch:', err)
        setRole('none')
      })
  }, [])

  return (
    <BrowserRouter>
      <HeaderWrapper/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/catalog' element={<Catalogue/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/calendar' element={<MyCalendar/>}/>
        <Route path='/messaging' element={<Messaging/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/opportunities' element={<Opportunities/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


