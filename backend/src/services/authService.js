const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (userData) => {
    return await User.create(userData);
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return null;

    return user;
};

exports.getSignedJwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

exports.getUserById = async (id) => {
    return await User.findByPk(id);
};
