import * as mongoose from 'mongoose';
import configJson from '../config.json';
import logger from '../logger';

mongoose.connect(configJson.db.url, configJson.db.options);

mongoose.connection.on('error', (err) => {
  logger.error('Database connection error: ', err);
  process.exit(1);
});

mongoose.connection.on('open', () => {
  logger.info('Database connection opened!');
});

export default mongoose.connection;
