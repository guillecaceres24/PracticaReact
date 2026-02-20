const commentService = require('../services/commentService');

// @desc    Get comments for a movie
// @route   GET /api/v1/movies/:movieId/comments
// @access  Public
exports.getComments = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByMovieId(req.params.movieId);
        res.status(200).json({ success: true, count: comments.length, data: comments });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Add a comment
// @route   POST /api/v1/movies/:movieId/comments
// @access  Private
exports.addComment = async (req, res) => {
    try {
        const commentData = {
            ...req.body,
            movieId: req.params.movieId,
            userId: req.user.id
        };

        const comment = await commentService.addComment(commentData);
        res.status(201).json({ success: true, data: comment });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete a comment
// @route   DELETE /api/v1/comments/:id
// @access  Private
exports.deleteComment = async (req, res) => {
    try {
        const result = await commentService.deleteComment(req.params.id, req.user.id);

        if (result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
