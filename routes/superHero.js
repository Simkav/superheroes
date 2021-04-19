const superHeroRouter = require('express')();
const SuperHeroController = require('../controllers/SuperHero.controller');
const heroInstance = require('../middlewares/heroInstance.mw');
const imageUploader = require('../middlewares/multer.mw');
const imageRouter = require('./image');
const superPowerRouter = require('./superPower');

superHeroRouter
  .route('/')
  .get(SuperHeroController.getHeroes)
  .post(SuperHeroController.createHero);

superHeroRouter
  .route('/:id')
  .all(heroInstance)
  .get(SuperHeroController.getHeroById)
  .delete(SuperHeroController.deleteHero)
  .patch(SuperHeroController.updateHero);

superHeroRouter.post(
  '/withImages',
  imageUploader,
  SuperHeroController.createHeroWithImages
);
superHeroRouter.post(
  '/withPowers',
  heroInstance,
  SuperHeroController.createHeroWithPowers
);
superHeroRouter.post(
  '/fullHero',
  imageUploader,
  SuperHeroController.createFullHero
);

superHeroRouter.use('/images', imageRouter);
superHeroRouter.use('/powers', superPowerRouter);

// superHeroRouter.get('/', SuperHeroController.getHeroes);
// superHeroRouter.get('/:id', heroInstance, SuperHeroController.getHeroById);
// superHeroRouter.post('/', SuperHeroController.createHero);

// superHeroRouter.delete('/:id', heroInstance, SuperHeroController.deleteHero);
// superHeroRouter.patch('/:id', heroInstance, SuperHeroController.updateHero);

// superHeroRouter.get(
//   '/:id/getImages',
//   heroInstance,
//   SuperHeroController.getImagesFromHero
// );
// superHeroRouter.get(
//   '/:id/getPowers',
//   heroInstance,
//   SuperHeroController.getSuperPowersFromHero
// );

// superHeroRouter.delete(
//   '/:id/deleteImage/:imageId',
//   heroInstance,
//   SuperHeroController.removeImageFromHero
// );
// superHeroRouter.delete(
//   '/:id/deletePower/:powerId',
//   heroInstance,
//   SuperHeroController.removeSuperPowerFromHero
// );

// superHeroRouter.patch(
//   '/:id/addPowers',
//   heroInstance,
//   SuperHeroController.addSuperPowersToHero
// );

// superHeroRouter.patch(
//   '/:id/addImages',
//   heroInstance,
//   imageUploader,
//   SuperHeroController.addImages
// );

module.exports = superHeroRouter;
