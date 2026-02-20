const axios = require('axios');

const testRegistration = async () => {
    const testUser = {
        username: 'testuser_' + Date.now(),
        email: 'test_' + Date.now() + '@example.com',
        password: 'password123'
    };

    console.log('Sending registration request for:', testUser.username);

    try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/register', testUser);
        console.log('Registration SUCCESS!');
        console.log('Response status:', res.status);
        console.log('Response data:', JSON.stringify(res.data, null, 2));

        if (res.data.token) {
            console.log('Attempting to fetch /me with token...');
            const meRes = await axios.get('http://localhost:5000/api/v1/auth/me', {
                headers: { Authorization: `Bearer ${res.data.token}` }
            });
            console.log('/me SUCCESS!');
            console.log('User data:', JSON.stringify(meRes.data.data, null, 2));
        }
    } catch (err) {
        console.error('Registration FAILED!');
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data, null, 2));
        } else {
            console.error('Error message:', err.message);
        }
    }
};

testRegistration();
