import React, { useState } from 'react';
import './App.css';

const apiUrl = 'http://localhost:3000';

function App() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [token, setToken] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSignup = () => {
    fetch(`${apiUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, email, password }),
    })
      .then(response => {
        if (response.ok) {
          setFirstName('');
          setEmail('');
          setPassword('');
        } else {
          console.error('Signup failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLogin = () => {
    fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          setToken(data.token);
        } else {
          console.error('Login failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCreateTodo = () => {
    fetch(`${apiUrl}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ title: todoTitle, description: todoDescription }),
    })
      .then(response => {
        if (response.ok) {
          setTodoTitle('');
          setTodoDescription('');
        } else {
          console.error('Failed to create todo');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleShowTodos = () => {
    fetch(`${apiUrl}/api/todos`, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <div id="signup" style={{ display: token ? 'none' : 'block' }}>
        <h2>Sign Up</h2>
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
      <div id="login" style={{ display: token ? 'none' : 'block' }}>
        <h2>Login</h2>
        <input type="text" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div id="dashboard" style={{ display: token ? 'block' : 'none' }}>
        <h2>Welcome to the Dashboard</h2>
        <div id="createTodo">
          <h3>Create a Todo</h3>
          <input type="text" value={todoTitle} onChange={e => setTodoTitle(e.target.value)} placeholder="Title" />
          <input
            type="text"
            value={todoDescription}
            onChange={e => setTodoDescription(e.target.value)}
            placeholder="Description"
          />
          <button onClick={handleCreateTodo}>Create Todo</button>
        </div>
        <div id="showTodos">
          <h3>Your Todos</h3>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <strong>Title:</strong> {todo.title} <strong>Description:</strong> {todo.description}
              </li>
            ))}
          </ul>
          <button onClick={handleShowTodos}>Show Todos</button>
        </div>
      </div>
    </div>
  );
}

export default App;
