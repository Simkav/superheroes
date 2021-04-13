const { mkdir } = require('fs/promises');
const { STATIC_IMAGES_PATH } = require('../config');
module.exports = async () => {
  mkdir(STATIC_IMAGES_PATH, { recursive: true });
};
