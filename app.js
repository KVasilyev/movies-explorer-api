require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/limiter');
const errorHandler = require('./middlewares/errorHandler');

const { PORT, NODE_ENV, MONGO_URL } = process.env;

const app = express();
app.use(cors());
app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);
app.use(require('./routes/index'));

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
