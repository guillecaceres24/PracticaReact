const sequelize = require('./src/config/sequelize');

async function purgeForeignKeys() {
    try {
        const tables = ['comments', 'movies'];
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        for (const table of tables) {
            console.log(`Purging FKs for table: ${table}`);
            const [fks] = await sequelize.query(`
        SELECT CONSTRAINT_NAME 
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = 'cinema_db' 
        AND TABLE_NAME = '${table}' 
        AND CONSTRAINT_TYPE = 'FOREIGN KEY'
      `);

            for (const fk of fks) {
                console.log(`Dropping FK: ${fk.CONSTRAINT_NAME} from ${table}`);
                await sequelize.query(`ALTER TABLE ${table} DROP FOREIGN KEY ${fk.CONSTRAINT_NAME}`);
            }
        }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Purge complete. Restarting sync...');

        // Explicitly sync to recreate ONLY the correct FKs from models/associations
        require('./src/models/associations');
        await sequelize.sync();

        console.log('All correct FKs recreated. Retrying movie deletion...');
        process.exit(0);
    } catch (err) {
        console.error('Purge failed:', err);
        process.exit(1);
    }
}

purgeForeignKeys();
