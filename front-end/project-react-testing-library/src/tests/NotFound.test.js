import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente <NotFound.js />', () => {
  it('Testa se é exibido um heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');
    const notFoundMessage = screen.getByRole(
      'heading', { level: 2, name: 'Page requested not found Crying emoji',
      },
    );
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Testa se é exibida a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');
    const notFoundImage = screen.getByRole(
      'img', { name: 'Pikachu crying because the page requested was not found',
      },
    );
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
