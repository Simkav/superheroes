const createError = require('http-errors');
const { SuperHero, SuperPower, Image } = require('../db/models');
const pickBody = require('../utils/pickBody');
const validatePage = require('../utils/validatePage');
//TODO Work with errors
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
    const heroes = await SuperHero.findAll({
      limit: 5,
      offset,
      include: [Image, SuperPower],
    });
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


