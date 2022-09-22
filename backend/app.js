require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const {
  createUser,
  login,
  loginout,
} = require('./controllers/users');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT, () => {
      console.log(`Сервер запущен на localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

app.use(cors);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .regex(/(https?:\/\/)(www)?([a-z\d.-]+)\.([a-z.])([a-z\d-._~:/?#[\]@!$&'()*+,;=]*)(#)?$/i),
  }),
}), createUser);

app.delete('/signout', loginout);

app.use(auth);

app.use('/', require('./routes/cards'));

app.use('/', require('./routes/users'));

app.use('*', require('./routes/notFountPath'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
