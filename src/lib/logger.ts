import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');

let logger: any = null; 

if(isLoggerEnabled()) {
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
    
    const logFormat = format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    });
    
    logger = createLogger({
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

    logger.add(new transports.Console({
        format: format.simple()
    }));
}

export function isLoggerEnabled() {
    return process.env.ENABLE_SYSTEM_LOGS || false;
}

export default function throwLoggerError(message: string) {
    if(logger) logger.error(message);
}

export function throwLoggerInfo(message: string) {
    if(logger) logger.info(message);
}