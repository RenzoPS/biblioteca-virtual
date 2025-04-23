const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

// Import routes
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());  // Adds various HTTP headers for security
app.use(morgan('dev'));  // HTTP request logger

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app; 