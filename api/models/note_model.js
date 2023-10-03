const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Author = require('./author_model');

const Note = sequelize.define('Note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,

    }
});
Note.belongsTo(Author);
Author.hasMany(Note);
module.exports = Note;