const createError = require('http-errors');
const { SuperPower } = require('../db/models');
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
