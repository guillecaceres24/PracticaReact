const express = require('express');
const {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies');
const { protect } = require('../middleware/auth');
const commentsRouter = require('./comments');

const router = express.Router();

// Re-route into other resource routers
router.use('/:movieId/comments', commentsRouter);

router.route('/')
    .get(getMovies)
    .post(protect, createMovie);

router.route('/:id')
    .get(getMovie)
    .put(protect, updateMovie)
    .delete(protect, deleteMovie);

module.exports = router;
