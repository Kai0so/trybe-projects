import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByRole(
      'heading', { level: 2, name: /About Pokédex/i },
    );
    expect(aboutHeading).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutInfo = screen.getAllByText(/Pokémons/i);
    expect(aboutInfo).toHaveLength(2);
  });

  it('Testa se a página contém a imagem correta da Pokédex', () => {
    renderWithRouter(<About />);
    const aboutImage = screen.getByRole('img');
    expect(aboutImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
