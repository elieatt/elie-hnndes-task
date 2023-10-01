const { sequelize, DataTypes } = require('./index');
const Author = require('./author_model');

// Define model
const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

});

Note.belongsTo(Author);
Author.hasMany(Note);

module.exports = Note;
