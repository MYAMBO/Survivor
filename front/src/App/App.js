import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';

import Home from '../Home/Home';
import Projects from '../Projects/Projects';
import Calendar from '../Calendar/Calendar';
import SignUp from '../Log/Signup';
import Login from '../Log/Login';
import './App.css';

function Log() {
  return (<Login/>)
}

function SignUpLog() {
  return (<SignUp/>)
}

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Log/>}/>
        <Route path='/signup' element={<SignUpLog/>}/>
        <Route path='/projects' element={<Project/>}/>
        <Route path='/contacts' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
