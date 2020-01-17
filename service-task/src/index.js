import { app } from './app';
import { connect } from './utils/db';
import config from './config';
import { logger } from './utils/logger';

(async () => {
  try {
    await connect();
    app.listen(config.port, () => logger.info(`Server is running on port ${config.port}`));
  } catch (e) {
    logger.error(e);
  }
})();
