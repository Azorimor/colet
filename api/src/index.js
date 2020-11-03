const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

// Router
const router = require('./routes/main.router');

// Load env values
dotenv.config();
mongoose
    .connect(process.env.DATABASE_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Database connected.');

      const app = express();

      // Middleware
      app.use(express.urlencoded({extended: true}));
      app.use(express.json());

      // Routes
      app.use('/', router);

      // Starting express server
      app.listen(process.env.PORT, () => {
        console.log(`Server has started at port ${process.env.PORT}`);
      });
    })
    .catch( (error) => {
      console.log(error);
    });
