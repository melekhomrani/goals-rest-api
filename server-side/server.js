const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('colors');

const GoalRouter = require('./routes/goals.route');
const UserRouter = require('./routes/users.route');
const errorHandler = require('./middlewares/errorHandler.middleware');

require('./config/db.config');

const PORT = process.env.PORT || 3000;

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use('/api/goals', GoalRouter);
app.use('/api/users', UserRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is running on port', PORT.green);
});
