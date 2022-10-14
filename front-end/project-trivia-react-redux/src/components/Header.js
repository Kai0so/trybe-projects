import React from 'react';

class Config extends React.Component {
  render() {
    return (
      <section>
        <h2 data-testid="header-player-name">
          Jodador 1
          {/* { playerName -- vem do state que está no login } */}
        </h2>
        {/* <img data-testid="header-profile-picture" src={ imagem do gravatar } /> */}
        <h2 data-testid="header-score">
          0 pontos
          {/* { pontuação -- vem do state que está no login } */}
        </h2>
      </section>
    );
  }
}
export default Config;
