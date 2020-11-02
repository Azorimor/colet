const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

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
      app.listen(process.env.PORT, () => {
        console.log(`Server has started at port ${process.env.PORT}`);
      });
    })
    .catch( (error) => {
      console.log(error);
    });
