const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const findAnimal = (person) => species.filter((specie) =>
  person.includes(specie.id)).map((specie) => specie.name);

const findLocation = (person) => species.filter((specie) =>
  person.includes(specie.id)).map((specie) => specie.location);

const getEmployees = (options) => {
  if (options === undefined) {
    const objectArray = employees.map((person) => ({
      id: person.id,
      fullName: `${person.firstName} ${person.lastName}`,
      species: findAnimal(person.responsibleFor),
      locations: findLocation(person.responsibleFor),
    }));
    return objectArray;
  }
};

const findPersonById = (options) => {
  const nameContains = employees.some((person) => person.id === options.id
    || person.firstName === options.name || person.lastName === options.name);
  if (nameContains === true) {
    const employee = employees.find((person) => person.id === options.id
    || person.firstName === options.name || person.lastName === options.name);
    const employeeObject = {
      id: employee.id,
      fullName: `${employee.firstName} ${employee.lastName}`,
      species: findAnimal(employee.responsibleFor),
      locations: findLocation(employee.responsibleFor),
    };
    return employeeObject;
  }
  throw new Error('Informações inválidas');
};

function getEmployeesCoverage(options) {
  return getEmployees(options) || findPersonById(options);
}

module.exports = getEmployeesCoverage;
