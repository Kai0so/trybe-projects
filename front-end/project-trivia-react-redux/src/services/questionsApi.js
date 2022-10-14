// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}

async function fetchTrivia(token) {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const retorno = await fetch(url);
    const resposta = await retorno.json();
    return resposta;
  } catch (error) {
    return error;
  }
}

export default fetchTrivia;
