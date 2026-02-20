const sequelize = require('./src/config/sequelize');

async function inspectSchema() {
    try {
        const [results] = await sequelize.query('SHOW CREATE TABLE comments');
        console.log('--- CREATE TABLE comments ---');
        console.log(results[0]['Create Table']);

        const [fkResults] = await sequelize.query(`
      SELECT 
        TABLE_NAME, 
        COLUMN_NAME, 
        CONSTRAINT_NAME, 
        REFERENCED_TABLE_NAME, 
        REFERENCED_COLUMN_NAME
      FROM 
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
      WHERE 
        TABLE_SCHEMA = 'cinema_db' 
        AND TABLE_NAME = 'comments';
    `);
        console.log('--- Foreign Keys on comments ---');
        console.table(fkResults);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

inspectSchema();
