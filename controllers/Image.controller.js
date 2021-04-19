const createError = require('http-errors');
const { Image } = require('../db/models');
module.exports.getImagesFromHero = async (req, res, next) => {
  try {
    const { heroInstance } = req;

    const heroImages = await heroInstance.getImages();

    res.status(200).send({ data: { heroImages } });
  } catch (er) {
    console.log(err);
    next(err);
  }
};

module.exports.addImages = async (req, res, next) => {
  try {
    const { files, heroInstance } = req;

    const heroId = heroInstance.id;

    const imagePaths = files.map(image => {
      return { path: image.filename, heroId };
    });

    const addedImages = await Image.bulkCreate(imagePaths);

    res.status(200).send({ data: { addedImages } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.removeImageFromHero = async (req, res, next) => {
  try {
    const {
      params: { imageId },
      heroInstance,
    } = req;

    const heroId = heroInstance.id;

    const heroImage = await Image.findOne({
      where: { heroId, id: imageId },
      returning: true,
    });

    if (!heroImage) {
      return next(createError(404, 'Cant find image'));
    }

    const returnedImages = heroImage;

    await heroImage.destroy();

    res.status(200).send({ data: { returnedImages } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
