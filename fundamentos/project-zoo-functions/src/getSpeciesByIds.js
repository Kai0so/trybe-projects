const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  const array = [];
  species.forEach((value) => {
    ids.forEach((idOfSpecie) => {
      if (value.id === idOfSpecie) {
        array.push(value);
      }
    });
  });
  return array;
}

module.exports = getSpeciesByIds;
