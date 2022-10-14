async function fetchAPI() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  try {
    const request = await fetch(url);
    const response = await request.json();
    return response.results;
  } catch (error) {
    return error;
  }
}

export default fetchAPI;
