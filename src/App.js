import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="container mt-4">
        <Routes>
        <Route exact path="/" element={<Home/>}/>
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
