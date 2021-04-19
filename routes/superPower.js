const superPowerRouter = require('express')();
const SuperPowerController = require('../controllers/SuperPower.controller');

superPowerRouter
  .route('/')
  .get(SuperPowerController.getSuperPowersFromHero)
  .patch(SuperPowerController.addSuperPowersToHero);
superPowerRouter.delete(
  '/:powerId',
  SuperPowerController.removeSuperPowerFromHero
);

module.exports = superPowerRouter;
