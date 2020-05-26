const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
require('./routes/auth')(app);
require('./routes/message')(app);

app.use(errors());

app.get('/', (req, res) => {
  res.send('OK');
});

module.exports = app;