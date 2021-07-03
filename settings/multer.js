const multer = require('multer');
const config = require('config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.get('path.uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });
module.exports = upload;
