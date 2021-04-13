const { SuperHero } = require('../models');
const createError = require('http-errors');
module.exports = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const heroInstance = await SuperHero.findByPk(id);
  if (!heroInstance) {
    return next(createError(404));
  }
  req.heroInstance = heroInstance;
  next();
};
