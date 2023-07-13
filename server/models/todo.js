// models/todo.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Todo = (userDB) => {
  return userDB.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'todos', // Specify the name of the user-specific todo table
    timestamps: false, // If you don't need timestamp fields (createdAt, updatedAt)
  });
};

module.exports = Todo;
