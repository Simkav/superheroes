const createError = require('http-errors');
const { SuperHero, SuperPower, Image } = require('../models');
const pickBody = require('../utils/pickBody');
const validatePage = require('../utils/validatePage');

const avalibleValues = [
  'nickname',
  'realName',
  'originDescription',
  'catchPhrase',
];

module.exports.getHeroes = async (req, res, next) => {
  try {
    const {
      query: { page },
    } = req;
    const offset = await validatePage(page);
    const heroes = await SuperHero.findAll({ limit: 5, offset });
    res.status(200).send({ data: { heroes } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.createHero = async (req, res, next) => {
  try {
    const { body } = req;

    const createdHero = await SuperHero.create(body);
    if (!createdHero) {
      return next(createError(400));
    }
    res.status(201).send({ data: { createdHero } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getHeroById = async (req, res, next) => {
  try {
    const { heroInstance } = req;
    res.status(200).send({ data: { heroInstance } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.deleteHero = async (req, res, next) => {
  try {
    const { heroInstance } = req;
    await hero.destroy();
    res.status(200).send({ data: { heroInstance } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.updateHero = async (req, res, next) => {
  try {
    const { body, heroInstance } = req;
    const parsedBody = pickBody(body, avalibleValues);
    await heroInstance.update(parsedBody);
    res.status(200).send({ data: { heroInstance } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.createHeroWithImages = async (req, res, next) => {
  try {
    const { body, files } = req;

    const hero = await SuperHero.create(body);
    if (!hero) {
      return next(createError(404, 'Hero not created'));
    }

    const imageNames = files.map(image => {
      return { path: image.filename, heroId: hero.dataValues.id };
    });

    const createdImages = await Image.bulkCreate(imageNames);

    if (!createdImages) {
      return next(createError(404, 'Error while creating image'));
    }

    res.send({ data: { hero, createdImages } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.createHeroWithPowers = async (req, res, next) => {
  try {
    const { body } = req;

    const hero = await SuperHero.create(body);
    if (!hero) {
      return next(createError(404, 'Hero not created'));
    }

    const powers = body.superpowers.map(power => {
      return {
        power,
      };
    });

    const createdPowers = await SuperPower.bulkCreate(powers);

    if (!createdPowers) {
      return next(createError(404, 'Error while creating power'));
    }

    await hero.addSuperPowers(createdPowers);

    res.send({ data: { hero, createdPowers } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.createFullHero = async (req, res, next) => {
  try {
    const { body, files } = req;

    const hero = await SuperHero.create(body);
    if (!hero) {
      return next(createError(404, 'Hero not created'));
    }

    const imagePaths = files.map(image => {
      return { path: image.filename, heroId: hero.dataValues.id };
    });

    const createdImages = await Image.bulkCreate(imagePaths);

    if (!createdImages) {
      return next(createError(404, 'Error while creating image'));
    }

    const powers = body.superpowers.map(power => {
      return {
        power,
      };
    });

    const createdPowers = await SuperPower.bulkCreate(powers);

    if (!createdPowers) {
      return next(createError(404, 'Error while creating power'));
    }
    await hero.addSuperPowers(createdPowers);

    res.send({ data: { hero, createdImages, createdPowers } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

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

module.exports.getSuperPowersFromHero = async (req, res, next) => {
  try {
    const { heroInstance } = req;

    const heroPowers = await heroInstance.getSuperPowers();

    res.status(200).send({ data: { heroPowers } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.addSuperPowersToHero = async (req, res, next) => {
  try {
    const { body, heroInstance } = req;

    const powers = body.superpowers.map(power => {
      return {
        power,
      };
    });

    const createdPowers = await SuperPower.bulkCreate(powers);

    if (!createdPowers) {
      return next(createError(404, 'Error while creating power'));
    }
    await heroInstance.addSuperPowers(createdPowers);

    res.send({ data: { createdPowers } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.removeSuperPowerFromHero = async (req, res, next) => {
  try {
    const {
      heroInstance,
      params: { powerId },
    } = req;

    const powerInstance = await SuperPower.findByPk(powerId);

    const removedHeroPowers = await heroInstance.removeSuperPowers(
      powerInstance
    );

    res.statsu(200).send({ data: { removedHeroPowers } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
