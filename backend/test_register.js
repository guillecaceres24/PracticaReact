const sequelize = require('./src/config/sequelize');
const User = require('./src/models/User');

async function testRegister() {
    try {
        console.log('Testing user registration...');
        const userData = {
            username: 'testuser' + Date.now(),
            email: 'test' + Date.now() + '@example.com',
            password: 'password123'
        };

        const user = await User.create(userData);
        console.log('User created:', user.id);
        process.exit(0);
    } catch (err) {
        console.error('Registration failed:', err);
        process.exit(1);
    }
}

testRegister();
