const imageRouter = require('express')();
const ImageController = require('../controllers/Image.controller');
const imageUploader = require('../middlewares/multer.mw');

imageRouter
  .route('/')
  .get(ImageController.getImagesFromHero)
  .patch(imageUploader, ImageController.addImages);
imageRouter.delete('/:imageId', ImageController.removeImageFromHero);

module.exports = imageRouter;
