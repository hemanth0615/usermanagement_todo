const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const createTodoModel = (userDB) => {
  const Todo = userDB.define(
    'Todo',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'todos', // Specify the name of the user-specific todo table
      timestamps: false, // If you don't need timestamp fields (createdAt, updatedAt)
    }
  );

  // Function to create the todo table in the user-specific database
  Todo.createTodoTable = async () => {
    try {
      await Todo.sync();
      console.log('Todo table created successfully.');
    } catch (error) {
      console.error('Error occurred during todo table creation:', error);
    }
  };

  return Todo;
};

// Create the Todo model for the primary database
const Todo = createTodoModel(sequelize);

// Associate the Todo model with the User model if needed
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = createTodoModel;
