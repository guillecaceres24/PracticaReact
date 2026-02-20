const sequelize = require('./sequelize');

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connected successfully with Sequelize');

        // Initialize associations
        require('../models/associations');

        await sequelize.sync();
        console.log('Database synced');
    } catch (error) {
        console.error(`Error connecting to MySQL: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
