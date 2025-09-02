import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Login from '../Log/Login';
import SignUp from '../Log/Signup';

function Home() {
  return (<div>home</div>)
}

function Project() {
  return (<div>project</div>)
}

function Contact() {
  return (<div>contact</div>)
}

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
