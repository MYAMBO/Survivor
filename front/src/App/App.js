import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Projects from '../Projects/Projects';
import Calendar from '../Calendar/Calendar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/calendar' element={<Calendar/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
