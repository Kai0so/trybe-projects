const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const peopleObject = {};
  const childs = entrants.filter((entrant) => entrant.age < 18).length;
  peopleObject.child = childs;
  const adults = entrants.filter((entrant) => entrant.age >= 18 && entrant.age < 50).length;
  peopleObject.adult = adults;
  const seniors = entrants.filter((entrant) => entrant.age >= 50).length;
  peopleObject.senior = seniors;
  return peopleObject;
}

function calculateEntry(entrants) {
  let totalEntryValue = 0;
  if (entrants && Object.keys(entrants).length !== 0) {
    const childTotalPrice = countEntrants(entrants).child * data.prices.child;
    const adultTotalPrice = countEntrants(entrants).adult * data.prices.adult;
    const seniorTotalPrice = countEntrants(entrants).senior * data.prices.senior;
    totalEntryValue = childTotalPrice + adultTotalPrice + seniorTotalPrice;
  }
  return totalEntryValue;
}

module.exports = { calculateEntry, countEntrants };
