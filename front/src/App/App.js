import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Projects from '../Projects/Projects';
import Calendar from '../Calendar/Calendar';
import Header from '../Header/Header';
import SignUp from '../Log/Signup';
import Login from '../Log/Login';
import Home from '../Home/Home';
import './App.css';

function Log() {
  return (<Login/>)
}

function SignUpLog() {
  return (<SignUp/>)
}

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
        <Route path='/login' element={<Log/>}/>
        <Route path='/signup' element={<SignUpLog/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/Calendar' element={<Calendar/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
