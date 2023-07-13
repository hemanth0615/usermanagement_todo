const User = require('../models/user');

const Todo = require('../models/todo');
const sequelize = require('../config/db');
const { DataTypes, Sequelize } = require('sequelize');


exports.getAllTodos = async (req, res) => {
  try {
    const userId = req.params.id;

    // Import the User model correctly
    const User = require('../models/user');

    // Find the user-specific database name from the "users" table
    const user = await User.findByPk(userId);
    if (!user) {
      // Handle the case where the user does not exist
      return res.status(404).json({ error: 'User not found' });
    }

    const userDatabaseName = `userid${userId}_db`;

    // Connect to the user-specific database
    const userDB = new Sequelize(userDatabaseName, 'root', '1234', {
      host: 'localhost',
      dialect: 'mysql',
    });

    // Import the Todo model correctly
    const Todo = require('../models/todo');

    // Initialize the Todo model in the user-specific database
    Todo.init(userDB);

    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get all Todos for a specific user
exports.getAllTodos = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user-specific database name from the "databases" table in the primary database
    const primaryDB = new Sequelize('primary_database', 'root', '1234', {
      host: 'localhost',
      dialect: 'mysql',
    });

    const User = User.init(sequelize, Sequelize); // Initialize the User model
    const TodoModel = Todo.init(sequelize, Sequelize); // Initialize the Todo model

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userDatabaseName = `userid${user.id}_db.todos`;

    // Connect to the user-specific database
    const userDB = new Sequelize(userDatabaseName, 'root', '1234', {
      host: 'localhost',
      dialect: 'mysql',
    });

    TodoModel.init(userDB, Sequelize); // Initialize the Todo model in the user-specific database

    const todos = await TodoModel.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Create a Todo
exports.createTodo = async (req, res) => {
  try {
    const userID = req.params.userId;
    const { title, description } = req.body;

    // Find the user-specific database name from the "databases" table
    const userDatabaseName = `userid${userID}_db.todos`;

    // Connect to the user-specific database
    const userDB = new Sequelize(userDatabaseName, 'root', '1234', {
      host: 'localhost',
      dialect: 'mysql',
    });

    // Define the Todo model for the fixed "todos" table
    const TodoModel = userDB.define('todos', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    // Create a new todo instance and save it to the fixed "todos" table
    const newTodo = await TodoModel.create({
      title,
      description,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


// Get a Todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const todoId = req.params.id;

    // Find the user-specific database name from the "databases" table
    const userDatabaseName = `userid${userId}.todos`;
    const userDatabase = await Database.findOne({ where: { name: userDatabaseName } });

    if (!userDatabase) {
      // Handle the case where the user-specific database does not exist
      return res.status(404).json({ error: 'User database not found' });
    }

    // Connect to the user-specific database
    const userDB = new Sequelize(userDatabase.name, 'root', '', {
      host: 'localhost',
      dialect: 'mysql',
    });

    // Initialize the Todo model in the user-specific database
    const TodoModel = userDB.define('Todo', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    const todo = await TodoModel.findByPk(todoId);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Update a Todo
exports.updateTodo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const todoId = req.params.id;
    const { title, description } = req.body;

    // Find the user-specific database name from the "databases" table
    const userDatabaseName = `user_${userId}`;
    const userDatabase = await Database.findOne({ where: { name: userDatabaseName } });

    if (!userDatabase) {
      // Handle the case where the user-specific database does not exist
      return res.status(404).json({ error: 'User database not found' });
    }

    // Connect to the user-specific database
    const userDB = new Sequelize(userDatabase.name, 'root', '', {
      host: 'localhost',
      dialect: 'mysql',
    });

    // Initialize the Todo model in the user-specific database
    const TodoModel = userDB.define('Todo', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    const todo = await TodoModel.findByPk(todoId);
    if (todo) {
      await todo.update({ title, description });
      res.status(200).json(todo);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a Todo
exports.deleteTodo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const todoId = req.params.id;

    // Find the user-specific database name from the "databases" table
    const userDatabaseName = `user_${userId}`;
    const userDatabase = await Database.findOne({ where: { name: userDatabaseName } });

    if (!userDatabase) {
      // Handle the case where the user-specific database does not exist
      return res.status(404).json({ error: 'User database not found' });
    }

    // Connect to the user-specific database
    const userDB = new Sequelize(userDatabase.name, 'root', '', {
      host: 'localhost',
      dialect: 'mysql',
    });

    // Initialize the Todo model in the user-specific database
    const TodoModel = userDB.define('Todo', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    const todo = await TodoModel.findByPk(todoId);
    if (todo) {
      await todo.destroy();
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
