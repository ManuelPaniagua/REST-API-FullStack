import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTasks from './pages/CreateTasks';
import DeleteTask from './pages/DeleteTask';
import EditTask from './pages/EditTask';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/task/new' element={<CreateTasks />}></Route>
      <Route path='/task/delete/:id' element={<DeleteTask />}></Route>
      <Route path='/task/edit/:id' element={<EditTask />}></Route>
    </Routes>
  );
};

export default App;
