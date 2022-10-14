import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Testa se exibe corretamente a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoritePokemonsHeading = screen.getByRole(
      'heading', { level: 2, name: /Favorite pokémons/i },
    );
    expect(favoritePokemonsHeading).toBeInTheDocument();

    const notFoundMessage = screen.getByText('No favorite pokemon found');
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');

    const addToFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(addToFavorite);
    history.push('/favorites');
    expect(history.location.pathname).toBe('/favorites');

    const favoritePokemon = screen.getAllByAltText(/is marked as favorite/i);
    expect(favoritePokemon).toHaveLength(localStorage.length);
  });
});
