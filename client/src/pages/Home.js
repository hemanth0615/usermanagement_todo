import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
