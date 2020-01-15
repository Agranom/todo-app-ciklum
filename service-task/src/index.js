import { app } from './app';
import { connect } from './utils/db';
import config from './config';

(async () => {
  try {
    await connect();
    app.listen(config.port, () => console.info(`Server is running on port ${config.port}`));
  } catch (e) {
    console.error(e);
  }
})();
