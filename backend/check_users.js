const sequelize = require('./src/config/sequelize');
const User = require('./src/models/User');

async function checkUsers() {
    try {
        const users = await User.findAll();
        console.log('--- Current Users ---');
        console.table(users.map(u => ({ id: u.id, username: u.username, email: u.email })));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUsers();
