import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Catalogue from '../Catalogue/Catalogue';
import Messaging from '../Startup Area/Messaging/Messaging'
import Opportunities from '../Startup Area/Opportunities/Opportunities'
import Dashboard from '../Startup Area/Dashboard/Dashboard'
import Profile from '../Startup Area/Profile/Profile'
import Calendar from '../Calendar/Calendar';
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
  return (
    <BrowserRouter>
      <HeaderWrapper/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/catalog' element={<Catalogue/>}/>
        <Route path='/Calendar' element={<Calendar/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/calendar' element={<Calendar/>}/>
        <Route path='/messaging' element={<Messaging/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/opportunities' element={<Opportunities/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


