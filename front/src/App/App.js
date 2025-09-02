import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';

function Home() {
  return (<div>home</div>)
}

function Project() {
  return (<div>project</div>)
}

function Contact() {
  return (<div>contact</div>)
}

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
