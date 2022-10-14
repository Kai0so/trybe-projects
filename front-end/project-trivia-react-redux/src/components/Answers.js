import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actionGame, actionScore } from '../store/actions';

class Answers extends Component {
  constructor() {
    super();
    this.state = {
      sortedPositions: [],
      correctAnswer: '',
      isDisabled: false,
      ATIVO: false,
      nextPage: false,
      seconds: 30,
    };
  }

  componentDidMount() {
    this.shuffledAnswers();
    this.countDown();
  }

  buttonDisabled = () => {
    this.setState({
      isDisabled: true,
      ATIVO: true,
    });
  }

  countDown = () => {
    const second = 1000;
    // const fixSeconds = 30;
    window.interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds > 0 ? prevState.seconds - 1 : prevState.seconds,
      }));
      const { seconds } = this.state;
      if (seconds === 0) {
        clearInterval(window.interval);
        this.buttonDisabled();
      }
    }, second);
  }

  shuffledAnswers = () => {
    const { result, index } = this.props;
    let allAnswers = result.results[index].incorrect_answers;
    allAnswers = [...allAnswers, result.results[index].correct_answer];

    const shuffled = allAnswers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    this.setState({
      sortedPositions: [],
    }, () => this.updateState(shuffled));
  }

  updateState = (shuffled) => {
    const { result, index } = this.props;
    this.setState({
      sortedPositions: shuffled,
      correctAnswer: result.results[index].correct_answer,
    });
  }

  handleClick = ({ target }) => {
    const { correctAnswer, seconds } = this.state;
    const { score, result, updateScore, index } = this.props;
    const soma = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    let diff = Number;
    console.log(result.results[index].difficulty);

    clearInterval(window.interval);
    if (target.textContent === correctAnswer) {
      switch (result.results[index].difficulty) {
      case 'easy': {
        diff = easy;
        break; }
      case 'medium': {
        diff = medium;
        break; }
      case 'hard': {
        diff = hard;
        break;
      }
      default: {
        break;
      }
      }
      // A fórmula para cálculo dos pontos por pergunta é: 10 + (timer * dificuldade), onde timer é o tempo restante no contador de tempo e dificuldade é hard: 3, medium: 2, easy: 1, dependendo da pergunta. Exemplo: Se no momento da resposta correta o timer estiver contando 17 segundos, e a dificuldade da pergunta é 2 (média), a pontuação deve ser: 10 + (17 * 2) = 44

      // soma + (mult * seconds);

      const test = updateScore(soma + (seconds * diff));
      console.log(test);

      this.setState({
        ATIVO: true,
      });

      console.log(score);
    } else {
      this.setState({
        ATIVO: true,
      });
    }
  }

  handleNext = () => {
    const number = 4;
    const { updateIndex, index } = this.props;
    if (index === number) {
      this.setState({
        nextPage: true,
      });
    } else {
      updateIndex(1);
      this.countDown();
      this.setState({
        ATIVO: false,
        seconds: 30,
      }, this.shuffledAnswers);
    }
  }

  render() {
    const {
      sortedPositions,
      correctAnswer,
      isDisabled,
      ATIVO,
      nextPage,
      seconds,
    } = this.state;

    return (
      <div>
        <div data-testid="answer-options" className="answers_game">
          { sortedPositions.map((question, i) => (
            (question === correctAnswer)
              ? (
                <button
                  key={ i }
                  type="button"
                  data-testid="correct-answer"
                  disabled={ isDisabled }
                  onClick={ this.handleClick }
                  className={ ATIVO ? 'correctAnswer' : '' }
                >
                  { question }
                </button>)
              : (
                <button
                  key={ i }
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  disabled={ isDisabled }
                  onClick={ this.handleClick }
                  className={ ATIVO ? 'incorrectAnswer' : '' }
                >
                  { question }
                </button>
              )
          )) }
          {/* <Timer
            ATIVO={ ATIVO }
            buttonDisabled={ this.buttonDisabled }
          /> */}
          <h3>
            Timer:
            {seconds}
          </h3>
          {ATIVO ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNext }
            >
              Next
            </button>
          ) : (
            null) }

          { nextPage ? <Redirect to="/feedback" /> : null}
        </div>
      </div>
    );
  }
}

Answers.propTypes = {
  index: PropTypes.number,
  addToken: PropTypes.func,
  updateIndex: PropTypes.func,
  score: PropTypes.number,
  disabledButtons: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  index: state.gameReducer.index,
});

const mapDispatchToProps = (dispatch) => ({
  updateIndex: (payload) => dispatch(actionGame(payload)),
  updateScore: (payload) => dispatch(actionScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
