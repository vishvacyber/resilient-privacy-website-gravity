import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { initializeDatabase } from './database.js';
import logger from './utils/logger.js';
import { validateEnvironment } from './utils/validateEnv.js';

import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import contactRoutes from './routes/contacts.js';
import activityLogsRoutes from './routes/activityLogs.js';
import servicesRoutes from './routes/services.js';
import documentationRoutes from './routes/documentation.js';

// Rate limiter for static file serving (catch-all route)
const staticFileLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the RateLimit-* headers
    legacyHeaders: false, // Disable the X-RateLimit-* headers
});

// Load environment variables FIRST
dotenv.config();

// Validate environment configuration on startup
try {
    validateEnvironment();
} catch (error) {
    logger.error('Environment validation failed:', error);
    process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

import { SECURITY_CONFIG } from '../security.config.js';

// ... imports ...

// Security: Helmet middleware for security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: SECURITY_CONFIG.csp
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
    },
    frameguard: {
        action: 'deny'
    },
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin'
    }
}));

// Configure CORS based on environment
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? (process.env.CORS_ORIGIN || '').split(',').filter(Boolean)
        : '*',
    credentials: true,
    optionsSuccessStatus: 200
};

// Security: Trust proxy (required for rate limiting behind load balancers/proxies)
app.set('trust proxy', 1);

// Security: Rate limiting for API endpoints
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Security: Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: { error: 'Too many login attempts, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// HTTP request logging
app.use(morgan('combined', { stream: logger.stream }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    logger.info('Created uploads directory');
}
app.use('/uploads', express.static(uploadsDir));

// Initialize Database
initializeDatabase().then(() => {
    // Routes with rate limiting
    app.use('/api/auth', authLimiter, authRoutes);
    app.use('/api/jobs', apiLimiter, jobRoutes);
    app.use('/api/applications', apiLimiter, applicationRoutes);
    app.use('/api/contact', apiLimiter, contactRoutes);
    app.use('/api/activity-logs', apiLimiter, activityLogsRoutes);
    app.use('/api/services', apiLimiter, servicesRoutes);
    app.use('/api/documentation', apiLimiter, documentationRoutes);

    // Serve static files from the React app (only in production)
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../dist')));

        // The "catchall" handler: for any request that doesn't
        // match one above, send back React's index.html file.
        app.get('*', staticFileLimiter, (req, res) => {
            res.sendFile(path.join(__dirname, '../dist/index.html'));
        });
    }

    // Global error handler (must be last)
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        logger.error('Global error handler:', err);

        // Handle multer errors
        if (err.name === 'MulterError') {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
            }
            return res.status(400).json({ error: `File upload error: ${err.message}` });
        }

        // Handle validation errors from multer fileFilter
        if (err.message && err.message.includes('Invalid file type')) {
            return res.status(400).json({ error: err.message });
        }

        // Default error response
        res.status(err.status || 500).json({
            error: err.message || 'Internal server error'
        });
    });

    app.listen(PORT, () => {
        logger.info(`✅ Server running on http://localhost:${PORT}`);
        logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}).catch(err => {
    logger.error('Failed to initialize database:', err);
    process.exit(1);
});
