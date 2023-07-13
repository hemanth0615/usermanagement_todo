// const { User } = require('../models'); // Assuming User model is defined in a file named "user.js" in the "models" directory
const sequelize = require('../config/db');
const { Sequelize } = require('sequelize');
const User = require('../models/user')(sequelize, Sequelize.DataTypes);


// User Signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(409).send('User already exists');
      return;
    }
    const newUser = await User.create({ firstName, lastName, email, password });

const databaseName = `userid${newUser.id}_db`; // Generate a unique database name based on user ID
await sequelize.query(`CREATE DATABASE ${databaseName}`); // Create a new database

// Switch to the newly created database
const newSequelize = new Sequelize(databaseName, 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the Todo model for the new database
const Todo = newSequelize.define('Todo', {
  // Todo model properties
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

await Todo.sync();

// Now you can use the Todo model to interact with the user-specific todo table
// For example, you can create a new todo:
const newTodo = await Todo.create({
  title: 'New Todo',
  description: 'This is a new todo',
});

// You can also query the user-specific todos:
const todos = await Todo.findAll();
console.log(todos);

    res.status(201).send('Signup successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && user.password === password) {
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// User Data
exports.userData = async (req, res) => {
  try {
    const { email, password } = req.headers;
    const user = await User.findOne({ where: { email } });
    if (user && user.password === password) {
      const users = await User.findAll();
      const usersToReturn = users.map(user => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }));
      res.json(usersToReturn);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
