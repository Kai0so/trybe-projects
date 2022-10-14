const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  let employeeObject;
  employees.forEach((value) => {
    if (value.firstName === employeeName || value.lastName === employeeName) {
      employeeObject = value;
    }
  });
  return employeeObject;
}

module.exports = getEmployeeByName;
