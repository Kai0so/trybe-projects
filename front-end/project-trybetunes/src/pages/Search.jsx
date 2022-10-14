import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      searchButtonDisabled: true,
      loading: true,
      albums: [],
      artistToSearch: '',
      resultMessage: '',
    };
  }

  componentDidMount() {
    this.stopLoading();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {};
  }

  stopLoading = () => {
    this.setState({ loading: false });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ searchInput: value }, this.enableSearchButton);
  }

  enableSearchButton = () => {
    const {
      searchInput,
    } = this.state;

    const MIN_INPUT_LENGTH = 2;

    if (searchInput.length < MIN_INPUT_LENGTH) {
      this.setState({ searchButtonDisabled: true });
    } else {
      this.setState({ searchButtonDisabled: false });
    }
  }

  handleClick = () => {
    const {
      searchInput,
    } = this.state;

    this.setState({ loading: true, artistToSearch: searchInput }, this.findAlbuns);
  }

  findAlbuns = async () => {
    const {
      searchInput,
      artistToSearch,
    } = this.state;

    const MIN_RESULT_LENGTH = 1;

    const result = await searchAlbumsAPI(searchInput);
    if (result.length >= MIN_RESULT_LENGTH) {
      this.setState({
        albums: result,
        searchInput: '',
        resultMessage: `Resultado de álbuns de: ${artistToSearch}`,
        loading: false,
      });
    } else {
      this.setState({
        albums: [],
        searchInput: '',
        resultMessage: 'Nenhum álbum foi encontrado',
        loading: false,
      });
    }
  }

  render() {
    const {
      searchInput,
      searchButtonDisabled,
      loading,
      albums,
      resultMessage,
    } = this.state;

    return (
      loading ? <Loading /> : (
        <div data-testid="page-search">
          <Header />
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              value={ searchInput }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ searchButtonDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
          <span>
            { resultMessage }
          </span>
          <br />
          { albums.map((album) => (
            <li key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <br />
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Músicas
              </Link>
              <br />
              <span>{ album.collectionName }</span>
              <br />
              <span>{ album.artistName }</span>
            </li>
          ))}
        </div>
      ));
  }
}

export default Search;
