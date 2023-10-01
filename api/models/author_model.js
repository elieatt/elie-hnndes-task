const { sequelize, DataTypes } = require('./index');

// Define model
const Author = sequelize.define('Author', {
  name: DataTypes.STRING,
});

module.exports = Author;
