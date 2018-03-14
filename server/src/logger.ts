import pino from 'pino';

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

export default logger;
