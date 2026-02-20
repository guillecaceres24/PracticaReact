const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 100],
                msg: 'Title cannot be more than 100 characters'
            }
        }
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING,
        defaultValue: 'no-photo.jpg'
    }
});


module.exports = Movie;
