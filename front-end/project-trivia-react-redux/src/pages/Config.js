import React from 'react';

class Config extends React.Component {
  render() {
    return (
      <section className="section_config">
        <h1 data-testid="settings-title">
          Configurações
        </h1>
        <form className="form_config">
          <label htmlFor="categoria">
            Categoria:
            <select id="categoria">
              <option>
                Geral
              </option>
              <option>
                Animais
              </option>
            </select>
          </label>
          <label htmlFor="dificuldade">
            Dificuldade:
            <select id="dificuldade">
              <option>
                Fácil
              </option>
              <option>
                Médio
              </option>
              <option>
                Díficil
              </option>
            </select>
          </label>
          <label htmlFor="tipo">
            Tipo:
            <select id="tipo">
              <option>
                ?
              </option>
            </select>
          </label>
        </form>
      </section>
    );
  }
}
export default Config;
