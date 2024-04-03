import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logsDir) && process.env.ENABLE_SYSTEM_LOGS) {
    fs.mkdirSync(logsDir);
}

const logFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        logFormat
    ),
    transports: [
        new transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(logsDir, 'combined.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    if(process.env.ENABLE_SYSTEM_LOGS) logger.add(new transports.Console({
        format: format.simple()
    }));
}

export function isLoggerEnabled() {
    return process.env.ENABLE_SYSTEM_LOGS || false;
}

export default logger;
