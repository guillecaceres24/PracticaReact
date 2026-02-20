require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./src/config/db');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route files
const auth = require('./src/routes/auth');
const movies = require('./src/routes/movies');
const comments = require('./src/routes/comments');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/movies', movies);
app.use('/api/v1/comments', comments);

const startServer = async () => {
    try {
        // Connect to database
        await connectDB();

        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
