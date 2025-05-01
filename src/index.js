import { TEMP_DIR, UPLOADS_DIR } from './constants/index.js';
import { MongoDB } from './db/MongoDB.js';
import startServer from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await MongoDB();
  startServer();

  await createDirIfNotExists(TEMP_DIR);
  await createDirIfNotExists(UPLOADS_DIR);
};

bootstrap();
