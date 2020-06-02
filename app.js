const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const routes = require('./routes/routes.js');
const { login, createUser } = require('./controllers/users');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
