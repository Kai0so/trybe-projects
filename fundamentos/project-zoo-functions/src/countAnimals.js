const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function countAnimals(animal) {
  if (animal === undefined) {
    const animalList = {};
    data.species.forEach((specieName) => {
      animalList[specieName.name] = specieName.residents.length;
    });
    return animalList;
  }
  const { specie, sex } = animal;
  if (!sex) {
    const animalSpecieName = species
      .find((animalSpecie) => animalSpecie.name === specie).residents.length;
    return animalSpecieName;
  }
  const animalSex = species.find((animalSpecie) => animalSpecie.name === specie).residents
    .filter((residentAnimal) => residentAnimal.sex === sex).length;
  return animalSex;
}

module.exports = countAnimals;
