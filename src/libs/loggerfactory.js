import config from '../../config.js';
import winston from 'winston';

const { format } = winston;

export function createLogger() {
    return winston.createLogger({
        format: format.combine(
            format.metadata({
                fillExcept: ['message', 'level', 'format.timestamp', 'label'],
            }),
        ),
        transports: [
            consoleTransport,
            fileTransport('error', './log/error.log', logFileFormat),
            fileTransport(logLevel(), './log/all.log', logFileFormat),
        ],
    });
}
export function createHTTPLogger() {
    return new HTTPLogger(
        winston.createLogger({
            transports: [
                consoleTransport,
                fileTransport('silly', './log/http.log', format.json()),
            ],
        }),
    );
}

const logLevel = () => {
    return config.logLevel;
};

const cliColors = {
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        verbose: 'blue',
        debug: 'blue',
        silly: 'magenta',
    },
};

const logFileFormat = format.combine(format.timestamp(), format.json());
const consoleTransport = new winston.transports.Console({
    level: logLevel(),
    format: format.cli(cliColors),
});
const fileTransport = (level, file, format) => {
    return new winston.transports.File({
        level: level,
        filename: file,
        format: format,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    });
};

class HTTPLogger {
    constructor(winston) {
        this.winston = winston;
    }

    write(message) {
        this.winston.log('silly', message);
    }
}
export const Logger = createLogger();
