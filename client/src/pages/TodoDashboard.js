import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTodo = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      const response = await fetch('/create-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, description, userId }),
      });

      if (response.ok) {
        // Todo created successfully, update the todos list
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setTitle('');
        setDescription('');
      } else {
        // Handle error
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleShowTodos = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('/todos', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const todosData = await response.json();
        setTodos(todosData);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    handleShowTodos();
  }, []);

  return (
    <div>
      <h1>Todo Dashboard</h1>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Todo</button>
      </form>
      <button onClick={handleShowTodos}>Show Todos</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
