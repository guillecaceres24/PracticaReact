const movieService = require('../services/movieService');

// @desc    Get all movies
// @route   GET /api/v1/movies
// @access  Public
exports.getMovies = async (req, res) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json({ success: true, count: movies.length, data: movies });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get single movie
// @route   GET /api/v1/movies/:id
// @access  Public
exports.getMovie = async (req, res) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json({ success: true, data: movie });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create new movie
// @route   POST /api/v1/movies
// @access  Private
exports.createMovie = async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const movie = await movieService.createMovie(req.body);
        res.status(201).json({ success: true, data: movie });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update movie
// @route   PUT /api/v1/movies/:id
// @access  Private
exports.updateMovie = async (req, res) => {
    try {
        const result = await movieService.updateMovie(req.params.id, req.body, req.user.id);

        if (result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }

        res.status(200).json({ success: true, data: result.data });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete movie
// @route   DELETE /api/v1/movies/:id
// @access  Private
exports.deleteMovie = async (req, res) => {
    try {
        const result = await movieService.deleteMovie(req.params.id, req.user.id);

        if (result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
