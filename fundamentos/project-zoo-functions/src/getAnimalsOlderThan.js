const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  let result;
  const filteredSpecie = species.filter((specieToFind) => specieToFind.name === animal);
  filteredSpecie.forEach((specieList) => {
    result = specieList.residents.every((residentSpecie) => residentSpecie.age >= age);
  });
  return result;
}

module.exports = getAnimalsOlderThan;
