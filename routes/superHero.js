const { Router } = require('express');
const SuperHeroController = require('../controllers/SuperHero.controller');
const heroInstance = require('../middlewares/heroInstance.mw');

const superHeroRouter = Router();

superHeroRouter.get('/', SuperHeroController.getSuperHeroes);
superHeroRouter.get('/:id', heroInstance, SuperHeroController.getSuperHeroById);

superHeroRouter.post('/', SuperHeroController.createSuperHero);

superHeroRouter.delete('/:id', heroInstance, SuperHeroController.deleteHero);
superHeroRouter.patch('/:id', heroInstance, SuperHeroController.updateHero);

module.exports = superHeroRouter;
