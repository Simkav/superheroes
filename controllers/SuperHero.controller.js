const createError = require('http-errors');
const { SuperHero } = require('../models');
const pickBody = require('../utils/pickBody');

const availableFields = [
  'nickname',
  'realName',
  'originDescription',
  'catchPhrase',
];

module.exports.getSuperHeroes = async (req, res, next) => {
  try {
    const heroes = await SuperHero.findAll();
    res.status(200).send(heroes);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.createSuperHero = async (req, res, next) => {
  try {
    const { body } = req;

    const createdHero = await SuperHero.create(body);
    if (!createdHero) {
      return next(createError(400));
    }
    res.status(201).send(createdHero);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.getSuperHeroById = async (req, res, next) => {
  try {
    const { heroInstance } = req;
    res.status(200).send(heroInstance);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.deleteHero = async (req, res, next) => {
  try {
    const { heroInstance } = req;
    await hero.destroy();
    res.status(200).send(heroInstance);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.updateHero = async (req, res, next) => {
  try {
    const { body, heroInstance } = req;
    const pickedBody = pickBody(body, availableFields);
    await heroInstance.update(pickedBody);
    res.status(200).send(heroInstance);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
