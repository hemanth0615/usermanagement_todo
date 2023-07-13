const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('primary_database', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
