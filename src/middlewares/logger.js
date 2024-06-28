// src/middlewares/logger.js
import winston from 'winston';
import morgan from 'morgan';
import { format } from 'logform';

// TODO: MAX MB and Files

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
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
    verbose: 'cyan',
    debug: 'magenta',
    silly: 'gray',
};

winston.addColors(colors);

// Define custom CLI format with colors
const cliFormat = format.combine(
    format.colorize(),
    format.printf(
        ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`,
    ),
);

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
        format: cliFormat,
    }),
    new winston.transports.File({
        filename: './log/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: './log/combined.log' }),
];

// Create Winston logger instance
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info', // Default level
    levels,
    format: logFormat,
    transports,
    exitOnError: false, // Do not exit on handled exceptions
});

export const httpLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            // Configure Morgan to use our custom logger with the http severity
            write: (message) => logger.http(message.trim()),
        },
    },
);

export default logger;
