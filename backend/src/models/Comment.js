const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Movie = require('./Movie');

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: {
                args: [1, 500],
                msg: 'Comment cannot be more than 500 characters'
            }
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
});


module.exports = Comment;
