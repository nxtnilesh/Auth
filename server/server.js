import express from 'express';
import connectDB from './config/db.js';
import envConfig from './config/env.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors({
  origin: true,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/v1/auth', authRoutes);

// Error handling
app.use(errorHandler);

const PORT = envConfig.port || 5000;

app.listen(PORT, () => 
  console.log(`Server running in ${envConfig.nodeEnv} mode on port ${PORT}`)
);