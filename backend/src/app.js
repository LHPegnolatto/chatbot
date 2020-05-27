const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

app.use(cors());
app.use(express.json());

// Seed for create default values
require('./config/seed');

// Routes
require('./routes/auth')(app);
require('./routes/message')(app);
require('./routes/user')(app);

app.use(errors());

module.exports = app;