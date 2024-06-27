// src/middlewares/logger.js
import winston from 'winston';

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
);

// Define transports (console and/or file)
const transports = [
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
];

// Create Winston logger instance
const logger = winston.createLogger({
    level: 'info', // Default level
    levels,
    format: logFormat,
    transports,
    exitOnError: false, // Do not exit on handled exceptions
});

export default logger;
