const router = require('./routes/main.router');

const express = require('express');

const app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use('/', router);


module.exports = app;
