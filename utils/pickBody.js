const pick = require('lodash/pick');



module.exports = (body, values) => {
  return pick(body, values);
};
