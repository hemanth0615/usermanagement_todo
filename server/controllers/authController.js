const { Sequelize, DataTypes } = require('sequelize');
const User = require('../models/user');
const sequelize = require('../config/database');
const { generateToken } = require('../services/authService');


// User Signup

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).send('User already exists');
    }

    const newUser = await User.create({ firstName, lastName, email, password });

    const databaseName = `userid${newUser.id}_db`; // Generate a unique database name based on user ID
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`); // Create a new database if it doesn't exist

    // Associate the user with their specific database
    await User.update({ databaseName }, { where: { id: newUser.id } });

    return res.status(201).send('Signup successful');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && user.password === password) {
      // Generate a JWT with the user's ID
      const token = generateToken(user.id);

      return res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token, // Send the JWT back to the client
      });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};


// User Data
exports.userData = async (req, res) => {
  try {
    const { email, password } = req.headers;
    const user = await User.findOne({ where: { email } });
    if (user && user.password === password) {
      const users = await User.findAll();
      const usersToReturn = users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }));
      return res.json(usersToReturn);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};
