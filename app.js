const express = require('express');
const path = require('path');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const requestMethods = require('./middlewares/requestMethods');

// Routes
const authRoutes = require('./controller/auth');
const songApiRoutes = require('./controller/SongApi');
const userApiRoutes = require('./controller/User');
const appAuthRoutes = require('./controller/app_auth');
const meRoutes = require('./controller/Me');
const errorRoutes = require('./controller/Error');

const app = express();

// Dotenv
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// https://www.npmjs.com/package/hpp
app.use(hpp());

app.use(morgan('tiny'));

// Use cookies
app.use(cookieParser());

// Use cors
app.use(cors());

// Limit size 1kb
app.use(express.json({ limit: '1kb' }));
app.use(express.urlencoded({ extended: false, limit: '1kb' }));

// Use request methods, otherwise it will be a 405
app.use(requestMethods);

// ! Backend routes
// Auth routes for Spotify
app.use('/api/auth/', authRoutes);

// Auth routes for Application
app.use('/api/auth/app', appAuthRoutes);

// Error routes
app.use('/api/error/', errorRoutes);

// Me routes
app.use('/api/me/', meRoutes);

// Songs routes
app.use('/api/songs', songApiRoutes);

// User routes
app.use('/api/user', userApiRoutes);

module.exports = app;
