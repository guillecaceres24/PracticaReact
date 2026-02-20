const bcrypt = require('bcryptjs');

async function testBcrypt() {
    try {
        console.log('Testing bcryptjs...');
        const salt = await bcrypt.genSalt(10);
        console.log('Salt generated:', salt);
        const hash = await bcrypt.hash('password123', salt);
        console.log('Hash generated:', hash);
        process.exit(0);
    } catch (err) {
        console.error('Bcrypt failed:', err);
        process.exit(1);
    }
}

testBcrypt();
