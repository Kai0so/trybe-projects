const getSellers = async () => {
  const url = 'http://localhost:3001/users/sellers';
  const sellers = await fetch(url);
  const data = sellers.json();

  return data;
};

export const fetchUserById = async (id) => {
  const url = `http://localhost:3001/users/${id}`;
  const sellers = await fetch(url);
  const data = sellers.json();

  return data;
};

export default getSellers;
