const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Author = sequelize.define('Author', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format',
        },
      },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Author;