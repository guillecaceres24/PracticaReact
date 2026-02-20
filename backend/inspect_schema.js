const { sequelize } = require('./src/config/db');

async function inspectSchema() {
    try {
        const [results] = await sequelize.query(`
      SELECT 
        k.TABLE_NAME, 
        k.COLUMN_NAME, 
        k.CONSTRAINT_NAME, 
        k.REFERENCED_TABLE_NAME, 
        r.DELETE_RULE
      FROM 
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE k
      JOIN 
        INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS r 
        ON k.CONSTRAINT_NAME = r.CONSTRAINT_NAME 
        AND k.CONSTRAINT_SCHEMA = r.CONSTRAINT_SCHEMA
      WHERE 
        k.TABLE_SCHEMA = 'cinema_db'
      ORDER BY 
        k.TABLE_NAME, k.CONSTRAINT_NAME;
    `);

        console.log('--- Current Detailed Schema ---');
        console.table(results);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

inspectSchema();
