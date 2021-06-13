import { createLogger, transports, format } from 'winston'

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.cli(),
      ),
    }),

    new transports.File({
      filename: 'debug.log',
    }),

    new transports.File({
      filename: 'error.log',
      format: format.json(),
      level: 'error',
    }),
  ],
  exitOnError: true,
});

export const log = (message: string, meta?: object): void => {
  logger.debug(message, meta);
};

export const errorLog = (message: string, meta?: object): void => {
  logger.error(message, meta);
};
