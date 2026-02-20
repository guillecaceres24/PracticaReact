const { sequelize } = require('./src/config/db');
require('./src/models/associations');

async function forceSync() {
    try {
        console.log('Dropping tables and recreating with associations...');
        // This will drop AND recreate based on the models
        await sequelize.sync({ force: true });
        console.log('Database tables recreated successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error during force sync:', err);
        process.exit(1);
    }
}

forceSync();
