import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

const logFormat = format.printf(({ level, timestamp, message, stack }) => {
    if (typeof message === 'object') {
        message = JSON.stringify(message, null, 4)
    }
    return `\n${level}\n${timestamp}\n${stack || message}\n`
})

const devLogger = () => {
    return createLogger({
        level: 'silly',
        format: format.combine(
            format.colorize(),
            format.timestamp({ format: 'HH:mm:ss' }),
            format.errors({ stack: true }),
            logFormat
        ),
        transports: [new transports.Console()],
    })
}

const prodLogger = () => {
    return createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({ format: 'HH:mm:ss' }),
            format.errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.DailyRotateFile({
                filename: 'logs/%DATE%.log',
                datePattern: 'DD.MM.YY',
                maxSize: '20m',
                maxFiles: '7d',
            }),
        ],
    })
}

export const logger = process.env.NODE_ENV === 'production' ? prodLogger() : devLogger()
