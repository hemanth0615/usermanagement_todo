'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the Users table in the primary database
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create a dynamic database for each new user
    await queryInterface.sequelize.query('CREATE DATABASE IF NOT EXISTS `primary_database`;'); // Replace `primary_database` with your actual primary database name

    // Alter the database connection to use the user-specific database
    await queryInterface.sequelize.query('USE `user1id_db`;'); // Replace `user1id_db` with the dynamic database name

    // Create the Todos table in the user-specific database
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the Todos table
    await queryInterface.dropTable('Todos');

    // Delete the user-specific database
    await queryInterface.sequelize.query('DROP DATABASE IF EXISTS `user1id_db`;'); // Replace `user1id_db` with the dynamic database name

    // Drop the Users table from the primary database
    await queryInterface.dropTable('Users');
  }
};
