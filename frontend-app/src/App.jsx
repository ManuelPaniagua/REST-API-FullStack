import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTasks from './pages/CreateTasks';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/task/new' element={<CreateTasks />}></Route>
    </Routes>
  );
};

export default App;
