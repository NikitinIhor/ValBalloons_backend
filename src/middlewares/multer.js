import multer from 'multer';
import { TEMP_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: TEMP_DIR,

  filename: (req, file, callback) => {
    const uniquePreffics = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffics}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

export const upload = multer({
  storage,
  limits,
});
