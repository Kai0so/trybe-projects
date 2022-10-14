import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isSaveButtonDisabled: true,
      cardList: [],
      hasTrunfo: false,
    };
  }

  handleInputChange = ({ target: { id, value, checked } }) => {
    this.setState(id !== 'trunfo' ? { [id]: value } : { [id]: checked },
      this.saveButtonEnable);
  }

  saveButtonEnable = () => {
    const {
      name,
      description,
      attr1,
      attr2,
      attr3,
      imageUrl,
      rarity,
    } = this.state;

    const MAX_VALUE = 90;
    const MIN_VALUE = 0;
    const LIMIT_VALUE = 210;
    const SUM_VALUE = Number(attr1) + Number(attr2) + Number(attr3);

    if (name && description && imageUrl && rarity !== ''
      && attr1 >= MIN_VALUE
      && attr1 <= MAX_VALUE
      && attr2 >= MIN_VALUE
      && attr2 <= MAX_VALUE
      && attr3 >= MIN_VALUE
      && attr3 <= MAX_VALUE
      && SUM_VALUE <= LIMIT_VALUE) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

    saveCard = () => {
      const {
        name,
        description,
        attr1,
        attr2,
        attr3,
        imageUrl,
        rarity,
        trunfo,
        cardList,
      } = this.state;

      const card = {
        name,
        description,
        attr1,
        attr2,
        attr3,
        imageUrl,
        rarity,
        trunfo,
      };

      this.setState({
        name: '',
        description: '',
        attr1: '0',
        attr2: '0',
        attr3: '0',
        imageUrl: '',
        rarity: 'normal',
        trunfo: false,
        cardList: [...cardList, card],
      }, this.saveButtonEnable);

      if (trunfo) {
        this.setState({ hasTrunfo: true });
      }
    }

    render() {
      const {
        name,
        description,
        attr1,
        attr2,
        attr3,
        imageUrl,
        rarity,
        trunfo,
        isSaveButtonDisabled,
        hasTrunfo,
        cardList,
      } = this.state;

      return (
        <>
          <div>
            <h1>Tryunfo</h1>
          </div>
          <Form
            cardName={ name }
            cardDescription={ description }
            cardAttr1={ attr1 }
            cardAttr2={ attr2 }
            cardAttr3={ attr3 }
            cardImage={ imageUrl }
            cardRare={ rarity }
            onSaveButtonClick={ this.saveCard }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.handleInputChange }
            hasTrunfo={ hasTrunfo }
          />
          <Card
            cardName={ name }
            cardDescription={ description }
            cardAttr1={ attr1 }
            cardAttr2={ attr2 }
            cardAttr3={ attr3 }
            cardImage={ imageUrl }
            cardRare={ rarity }
            cardTrunfo={ trunfo }
          />
          { cardList.map((card, index) => (
            <li id="custom" key={ index }>
              <Card
                cardName={ card.name }
                cardDescription={ card.description }
                cardAttr1={ card.attr1 }
                cardAttr2={ card.attr2 }
                cardAttr3={ card.attr3 }
                cardImage={ card.imageUrl }
                cardRare={ card.rarity }
                cardTrunfo={ card.trunfo }
              />
            </li>
          ))}
        </>
      );
    }
}

export default App;
