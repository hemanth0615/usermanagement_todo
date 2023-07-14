// const Sequelize = require('sequelize');
// const config = require('./config.json');

// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config[env];

// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect,
//   }
// );

// module.exports = sequelize;


const { Sequelize } = require('sequelize');

// Set up the database connection
const sequelize = new Sequelize('primary_database', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
