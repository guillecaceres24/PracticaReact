const { sequelize } = require('./src/config/db');

const fixDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected');

        // Drop and recreate tables to clear trash indexes
        // This is safe because we are in development and the user wants to test registration
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.query('DROP TABLE IF EXISTS users');
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('Users table dropped. Re-syncing...');

        // This will recreate only the missing table
        // Use require to ensure Model is loaded
        require('./src/models/User');
        await sequelize.sync();

        console.log('Database fixed and synced.');

    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

fixDB();
