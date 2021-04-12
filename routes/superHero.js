const { Router } = require('express');
const SuperHeroController = require('../controllers/SuperHero.controller');
const heroInstance = require('../middlewares/heroInstance.mw');
const upload = require('../middlewares/multer.mw');

const superHeroRouter = Router();

superHeroRouter.get('/', SuperHeroController.getHeroes);
superHeroRouter.get('/:id', heroInstance, SuperHeroController.getHeroById);
superHeroRouter.get(
  '/:id/getImages',
  heroInstance,
  SuperHeroController.getImagesFromHero
);
superHeroRouter.get(
  '/:id/getPowers',
  heroInstance,
  SuperHeroController.getSuperPowersFromHero
);

superHeroRouter.post('/', SuperHeroController.createHero);

superHeroRouter.delete('/:id', heroInstance, SuperHeroController.deleteHero);
superHeroRouter.delete(
  '/:id/deleteImage/:imageId',
  heroInstance,
  SuperHeroController.removeImageFromHero
);
superHeroRouter.delete(
  '/:id/deletePower/:powerId',
  heroInstance,
  SuperHeroController.removeSuperPowerFromHero
);

superHeroRouter.patch('/:id', heroInstance, SuperHeroController.updateHero);

superHeroRouter.post(
  '/withImages',
  upload.array('images', 10),
  SuperHeroController.createHeroWithImages
);
superHeroRouter.post(
  '/withPowers',
  heroInstance,
  SuperHeroController.createHeroWithPowers
);
superHeroRouter.post(
  '/fullHero',
  upload.array('images', 10),
  SuperHeroController.createFullHero
);

superHeroRouter.patch(
  '/:id/addPowers',
  heroInstance,
  SuperHeroController.addSuperPowersToHero
);

superHeroRouter.patch(
  '/:id/addImages',
  heroInstance,
  upload.array('images', 10),
  SuperHeroController.addImages
);

module.exports = superHeroRouter;
