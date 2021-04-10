const pick = require('lodash/pick');

const avalibleValues = new Map([
  ['heroes', ['nickname', 'realName', 'originDescription', 'catchPhrase']],
]);

module.exports = async (req, res, next) => {
  const { body } = req;
  const route = req.originalUrl.split('/')[2];
  const values = avalibleValues.get(route);
  req.parsedBody = pick(body, values);
  next();
};
