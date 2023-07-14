// routes/todoRoutes.js

const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

// Create a new todo route
router.post('/todos', todoController.createTodo);

// Get all todos for a specific user route
router.get('/users/:userId/todos', todoController.getTodos);

module.exports = router;
