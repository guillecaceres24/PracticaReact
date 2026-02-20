const authService = require('../services/authService');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        sendTokenResponse(user, 201, res);
    } catch (err) {
        // Check for Sequelize validation errors
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const messages = err.errors.map(e => e.message);
            return res.status(400).json({
                success: false,
                error: messages.join(', ')
            });
        }

        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        const user = await authService.loginUser(email, password);

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = authService.getSignedJwtToken(user.id);

    res.status(statusCode).json({
        success: true,
        token
    });
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    const user = await authService.getUserById(req.user.id);
    res.status(200).json({ success: true, data: user });
};
