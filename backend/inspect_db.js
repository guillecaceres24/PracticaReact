const { sequelize } = require('./src/config/db');

const inspectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected');

        const [tables] = await sequelize.query('SHOW TABLES');
        console.log('Tables:', tables);

        for (const t of tables) {
            const tableName = Object.values(t)[0];
            const [indexes] = await sequelize.query(`SHOW INDEX FROM ${tableName}`);
            console.log(`Indexes for ${tableName}:`, indexes.length);
        }

    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

inspectDB();
