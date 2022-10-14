import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const FILTER_BUTTONS_LENGTH = 7;
const POKEMONS_DISPLAYED_LENGTH = 1;

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexHeading = screen.getByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );
    expect(pokedexHeading).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toHaveTextContent(/Próximo pokémon/i);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);

    userEvent.click(nextButton);
    expect(pokemonName).toHaveTextContent(/Charmander/i);
  });

  it('Testa se é exibido apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonsDisplayed = screen.getAllByTestId('pokemon-weight');
    expect(pokemonsDisplayed).toHaveLength(POKEMONS_DISPLAYED_LENGTH);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton).toHaveLength(FILTER_BUTTONS_LENGTH);

    const selectPokemonType = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(selectPokemonType);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/Electric/i);

    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeVisible();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toHaveTextContent(/All/i);

    userEvent.click(allButton);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);

    renderWithRouter(<App />);
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
  });
});
