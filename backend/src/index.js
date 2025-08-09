import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { connectToDatabase } from './config/db.js';
import { env } from './config/env.js';

import authRoutes from './routes/auth.routes.js';
import authorityRoutes from './routes/authority.routes.js';
import grievanceRoutes from './routes/grievance.routes.js';

const app = express();

// Security & utils
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

// Static assets (secretary photos)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'grievance-portal-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/authorities', authorityRoutes);
app.use('/api/grievances', grievanceRoutes);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

const start = async () => {
  await connectToDatabase();
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend running on http://localhost:${env.PORT}`);
  });
};

start();


