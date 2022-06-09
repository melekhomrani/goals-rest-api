const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database'.cyan.underline);
  })
  .catch((err) => {
    console.log('cannot connect to database');
  });
