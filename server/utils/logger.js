import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define colors for each level (for console output)
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

// Determine log level based on environment
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'info';
};

// Define format for development (human-readable)
const devFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} [${info.level}]: ${info.message}${info.stack ? '\n' + info.stack : ''}`
    )
);

// Define format for production (structured JSON)
const prodFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

// Choose format based on environment
const isDevelopment = (process.env.NODE_ENV || 'development') === 'development';
const logFormat = isDevelopment ? devFormat : prodFormat;

// Define transports
const transports = [
    // Console transport - always enabled
    new winston.transports.Console({
        format: logFormat,
    }),
];

// File transports - only in production or when explicitly enabled
if (!isDevelopment || process.env.ENABLE_FILE_LOGGING === 'true') {
    const logsDir = path.join(__dirname, '../../logs');

    // Error logs - separate file for errors only
    transports.push(
        new DailyRotateFile({
            filename: path.join(logsDir, 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxFiles: '14d',
            maxSize: '20m',
            format: prodFormat,
        })
    );

    // Combined logs - all levels
    transports.push(
        new DailyRotateFile({
            filename: path.join(logsDir, 'combined-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
            maxSize: '20m',
            format: prodFormat,
        })
    );

    // HTTP logs - request/response logging
    transports.push(
        new DailyRotateFile({
            filename: path.join(logsDir, 'http-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'http',
            maxFiles: '7d',
            maxSize: '20m',
            format: prodFormat,
        })
    );
}

// Create the logger
const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
    // Handle exceptions and rejections
    exceptionHandlers: [
        new winston.transports.Console({
            format: logFormat,
        }),
    ],
    rejectionHandlers: [
        new winston.transports.Console({
            format: logFormat,
        }),
    ],
});

// Create a stream object for Morgan HTTP logger
logger.stream = {
    write: (message) => {
        logger.http(message.trim());
    },
};

export default logger;
