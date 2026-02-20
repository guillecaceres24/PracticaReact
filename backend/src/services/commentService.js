const Comment = require('../models/Comment');
const User = require('../models/User');
const Movie = require('../models/Movie');

exports.getCommentsByMovieId = async (movieId) => {
    return await Comment.findAll({
        where: { movieId },
        include: [{ model: User, as: 'user', attributes: ['username'] }]
    });
};

exports.addComment = async (commentData) => {
    return await Comment.create(commentData);
};

exports.deleteComment = async (id, userId) => {
    const comment = await Comment.findByPk(id, {
        include: [{ model: Movie, as: 'movie' }]
    });

    if (!comment) return { status: 404, message: 'Comment not found' };

    const isCommentAuthor = comment.userId === userId;
    const isMovieOwner = comment.movie && comment.movie.userId === userId;

    if (!isCommentAuthor && !isMovieOwner) {
        return { status: 401, message: 'Not authorized to delete this comment' };
    }

    await comment.destroy();
    return { status: 200, data: {} };
};
