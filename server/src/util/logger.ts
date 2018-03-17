import * as pino from 'pino';

const logger = pino({
  name: 'spamdb',
  level: 'debug',
  prettyPrint: {
    levelFirst: true,
    forceColor: true
  }
});

if (process.env.loglevel) {
  logger.level = process.env.loglevel;
  logger.info('Setting loglevel to', logger.level);
}

// Disable stdout for testing
if (process.env.NODE_ENV === 'test') {
  logger.level = 'silent';
}

export function info(...args: any[]): any {
  return logger.info(...args);
}

export function error(...args: any[]): any {
  return logger.error(...args);
}

export function debug(...args: any[]): any {
  return logger.debug(...args);
}
