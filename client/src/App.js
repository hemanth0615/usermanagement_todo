import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TodoDashboard from './pages/TodoDashboard';
import TodoForm from './pages/TodoForm';
import Sample from './pages/Sample';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<TodoDashboard />} />
          <Route path="/create-todo" element={<TodoForm />} />
      </Routes>
    </Router>
  );
}

export default App;
