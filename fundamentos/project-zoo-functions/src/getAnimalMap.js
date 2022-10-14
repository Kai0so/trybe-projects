const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const animalsLocation = (options) => {
  if (!options || !options.includeNames) {
    const locationByRegion = {
      NE: species.filter((specie) => specie.location === 'NE')
        .map((animal) => animal.name),
      SE: species.filter((specie) => specie.location === 'SE')
        .map((animal) => animal.name),
      NW: species.filter((specie) => specie.location === 'NW')
        .map((animal) => animal.name),
      SW: species.filter((specie) => specie.location === 'SW')
        .map((animal) => animal.name),
    };
    return locationByRegion;
  }
};

const animalsLocationByName = (options) => {
  if (!options.sorted && !options.sex) {
    const residentsByName = {
      NE: species.filter((specie) => specie.location === 'NE')
        .map((animal) => ({ [animal.name]: animal.residents.map((resident) => resident.name) })),
      SE: species.filter((specie) => specie.location === 'SE')
        .map((animal) => ({ [animal.name]: animal.residents.map((resident) => resident.name) })),
      NW: species.filter((specie) => specie.location === 'NW')
        .map((animal) => ({ [animal.name]: animal.residents.map((resident) => resident.name) })),
      SW: species.filter((specie) => specie.location === 'SW')
        .map((animal) => ({ [animal.name]: animal.residents.map((resident) => resident.name) })),
    };
    return residentsByName;
  }
};

const sortedAnimalsLocation = (options) => {
  if (!options.sex) {
    const sortedResidents = {
      NE: species.filter((specie) => specie.location === 'NE')
        .map((animal) => ({ [animal.name]: animal.residents
          .map((resident) => resident.name).sort() })),
      SE: species.filter((specie) => specie.location === 'SE')
        .map((animal) => ({ [animal.name]: animal.residents
          .map((resident) => resident.name).sort() })),
      NW: species.filter((specie) => specie.location === 'NW')
        .map((animal) => ({ [animal.name]: animal.residents
          .map((resident) => resident.name).sort() })),
      SW: species.filter((specie) => specie.location === 'SW')
        .map((animal) => ({ [animal.name]: animal.residents
          .map((resident) => resident.name).sort() })),
    };
    return sortedResidents;
  }
};
const animalsLocationBySex = (options) => {
  if (!options.sorted) {
    const residentsBySex = {
      NE: species.filter((specie) => specie.location === 'NE')
        .map((animal) => ({ [animal.name]: animal.residents
          .filter((resident) => resident.sex === options.sex).map((filtRes) => filtRes.name) })),
      SE: species.filter((specie) => specie.location === 'SE')
        .map((animal) => ({ [animal.name]: animal.residents
          .filter((resident) => resident.sex === options.sex).map((filtRes) => filtRes.name) })),
      NW: species.filter((specie) => specie.location === 'NW')
        .map((animal) => ({ [animal.name]: animal.residents
          .filter((resident) => resident.sex === options.sex).map((filtRes) => filtRes.name) })),
      SW: species.filter((specie) => specie.location === 'SW')
        .map((animal) => ({ [animal.name]: animal.residents
          .filter((resident) => resident.sex === options.sex).map((filtRes) => filtRes.name) })),
    };
    return residentsBySex;
  }
};

const sortedAnimalsLocationBySex = (options) => {
  const sortedResidentsBySex = {
    NE: species.filter((specie) => specie.location === 'NE')
      .map((animal) => ({ [animal.name]: animal.residents
        .filter((resid) => resid.sex === options.sex).map((filtRes) => filtRes.name).sort() })),
    SE: species.filter((specie) => specie.location === 'SE')
      .map((animal) => ({ [animal.name]: animal.residents
        .filter((resid) => resid.sex === options.sex).map((filtRes) => filtRes.name).sort() })),
    NW: species.filter((specie) => specie.location === 'NW')
      .map((animal) => ({ [animal.name]: animal.residents
        .filter((resid) => resid.sex === options.sex).map((filtRes) => filtRes.name).sort() })),
    SW: species.filter((specie) => specie.location === 'SW')
      .map((animal) => ({ [animal.name]: animal.residents
        .filter((resid) => resid.sex === options.sex).map((filtRes) => filtRes.name).sort() })),
  };
  return sortedResidentsBySex;
};

function getAnimalMap(options) {
  return animalsLocation(options)
  || animalsLocationByName(options)
  || sortedAnimalsLocation(options)
  || animalsLocationBySex(options)
  || sortedAnimalsLocationBySex(options);
}

module.exports = getAnimalMap;
