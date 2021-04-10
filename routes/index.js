const { Router } = require('express');
const superHeroRouter = require('./superHero');
const router = Router();

router.use('/heroes', superHeroRouter);
module.exports = router;
