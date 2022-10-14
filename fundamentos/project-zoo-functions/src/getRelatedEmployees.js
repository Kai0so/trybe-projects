const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function getRelatedEmployees(managerId) {
  if (isManager(managerId) !== true) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  const employeeList = employees.filter((employee) => employee.managers[0] === managerId);
  const employeeName = employeeList.map((employee) => `${employee.firstName} ${employee.lastName}`);
  return employeeName;
}

module.exports = { isManager, getRelatedEmployees };
