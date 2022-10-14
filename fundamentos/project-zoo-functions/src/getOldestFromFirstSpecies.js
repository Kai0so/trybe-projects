const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const animal = employees.find((employee) => employee.id === id).responsibleFor[0];
  const olderAge = species.find((specie) => specie.id === animal).residents.map((age) => age.age)
    .sort((age1, age2) => age2 - age1)[0];
  const result = species.find((specie) => specie.id === animal).residents
    .find((resident) => resident.age === olderAge);
  return Object.values(result);
}

module.exports = getOldestFromFirstSpecies;
