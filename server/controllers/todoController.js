const User = require('../models/user');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Create a new todo
exports.createTodo = async (req, res) => {
  const { userId, description } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const databaseName = `userid${userId}_db`;
    const newSequelize = new Sequelize('mysql://root:1234@localhost/' + databaseName);

    const Todo = newSequelize.define('todos', {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    await newSequelize.sync();

    const todo = await Todo.create({ description });

    return res.status(201).json(todo);
  } catch (error) {
    console.error('Error occurred during todo creation:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// Get all todos for a specific user
exports.getTodos = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const databaseName = `userid${userId}_db`;
    const newSequelize = new Sequelize('mysql://root:1234@localhost/' + databaseName);

    const Todo = newSequelize.define('todos', {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    await newSequelize.sync();

    const todos = await Todo.findAll();

    return res.status(200).json(todos);
  } catch (error) {
    console.error('Error occurred while retrieving todos:', error);
    return res.status(500).send('Internal Server Error');
  }
};
