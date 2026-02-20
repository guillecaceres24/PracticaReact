const { sequelize } = require('./src/config/db');

async function cleanForeignKeys() {
    try {
        const [constraints] = await sequelize.query(`
      SELECT 
        TABLE_NAME, 
        CONSTRAINT_NAME 
      FROM 
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
      WHERE 
        TABLE_SCHEMA = 'cinema_db' 
        AND REFERENCED_TABLE_NAME IS NOT NULL
        AND TABLE_NAME IN ('movies', 'comments');
    `);

        console.log(`Found ${constraints.length} constraints to remove.`);

        for (const { TABLE_NAME, CONSTRAINT_NAME } of constraints) {
            console.log(`Dropping constraint ${CONSTRAINT_NAME} from ${TABLE_NAME}...`);
            try {
                // Use backticks carefully in the SQL string
                await sequelize.query("ALTER TABLE `" + TABLE_NAME + "` DROP FOREIGN KEY `" + CONSTRAINT_NAME + "`");
            } catch (e) {
                console.warn(`Could not drop ${CONSTRAINT_NAME}: ${e.message}`);
            }
        }

        console.log('Finished cleaning foreign keys.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

cleanForeignKeys();
