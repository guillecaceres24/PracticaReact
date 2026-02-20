const User = require('./User');
const Movie = require('./Movie');
const Comment = require('./Comment');

// User - Movie
User.hasMany(Movie, { foreignKey: 'userId', as: 'movies' });
Movie.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User - Comment
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Movie - Comment
Movie.hasMany(Comment, { foreignKey: 'movieId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Movie, { foreignKey: 'movieId', as: 'movie', onDelete: 'CASCADE' });

module.exports = { User, Movie, Comment };
