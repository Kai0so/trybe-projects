import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class FeedbackPage extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <section className="section_config">
        <Header />
        <h2 data-testid="feedback-total-score">
          0 pontos
          {/* { PONTUAÇÃO FINAL } */}
        </h2>

        <h1 data-testid="feedback-text"> Well Done! </h1>
        {/* se (acertou 3 ou mais perguntas ) {
          return (<h1 data-testid="feedback-text"> Well Done! </h1>)
        } senão {
          <h1 data-testid="feedback-text"> Could be better... </h1>
        }
        <h2 data-testid="feedback-total-question">
          3 perguntas
        </h2> */}
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </section>
    );
  }
}

FeedbackPage.propTypes = {
  history: PropTypes.obj,
}.isRequired;

export default FeedbackPage;
