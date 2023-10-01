const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DBName, process.env.DBUserName, process.env.DBPassword, {
    host: 'localhost',
    dialect: 'postgres'
});


module.exports = {
    sequelize,
    DataTypes,
};