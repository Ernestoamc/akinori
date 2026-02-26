const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const env = require('./config/env');
const connectDatabase = require('./config/db');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
let databaseInitPromise = null;

async function ensureDatabaseConnection() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!databaseInitPromise) {
    databaseInitPromise = connectDatabase().finally(() => {
      databaseInitPromise = null;
    });
  }

  await databaseInitPromise;
}

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (env.clientUrl === '*') {
        return callback(null, true);
      }

      if (env.clientUrlList.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, message: 'Backend activo' });
});

app.use('/api/v1', async (req, _res, next) => {
  if (req.path === '/health' || req.path.startsWith('/auth')) {
    return next();
  }

  try {
    await ensureDatabaseConnection();
    return next();
  } catch (error) {
    return next(error);
  }
});

app.use('/api/v1', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
