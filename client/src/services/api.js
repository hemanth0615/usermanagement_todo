import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your server URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// API endpoints
const API = {
  signup: (userData) => api.post('/signup', userData),
  login: (userData) => api.post('/login', userData),
  getTodos: () => api.get('/todos'),
  createTodo: (todoData) => api.post('/todos', todoData),
  updateTodo: (todoId, todoData) => api.put(`/todos/${todoId}`, todoData),
  deleteTodo: (todoId) => api.delete(`/todos/${todoId}`),
};

export default API;
