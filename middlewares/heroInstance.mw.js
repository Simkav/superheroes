const { SuperHero, Image, SuperPower } = require('../db/models');
const createError = require('http-errors');
module.exports = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const heroInstance = await SuperHero.findAll({
    where: { id },
    include: [Image, SuperPower],
  });
  if (!heroInstance) {
    return next(createError(404, 'Hero not found'));
  }
  req.heroInstance = heroInstance;
  next();
};
