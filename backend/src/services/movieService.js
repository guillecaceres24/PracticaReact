const Movie = require('../models/Movie');
const User = require('../models/User');

exports.getAllMovies = async () => {
    return await Movie.findAll({
        include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
    });
};

exports.getMovieById = async (id) => {
    return await Movie.findByPk(id, {
        include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
    });
};

exports.createMovie = async (movieData) => {
    return await Movie.create(movieData);
};

exports.updateMovie = async (id, movieData, userId) => {
    const movie = await Movie.findByPk(id);
    if (!movie) return { status: 404, message: 'Movie not found' };

    if (movie.userId !== userId) {
        return { status: 401, message: 'Not authorized to update this movie' };
    }

    await movie.update(movieData);
    return { status: 200, data: movie };
};

exports.deleteMovie = async (id, userId) => {
    const movie = await Movie.findByPk(id);
    if (!movie) return { status: 404, message: 'Movie not found' };

    if (movie.userId !== userId) {
        return { status: 401, message: 'Not authorized to delete this movie' };
    }

    await movie.destroy();
    return { status: 200, data: {} };
};
