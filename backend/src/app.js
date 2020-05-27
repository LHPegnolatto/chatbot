const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
require('./routes/auth')(app);
require('./routes/message')(app);
require('./routes/user')(app);

app.use(errors());

module.exports = app;