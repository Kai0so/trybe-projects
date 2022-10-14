import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.checkFavoriteSongs();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {};
  }

  handleClick = async () => {
    const { song } = this.props;
    const { favorite } = this.state;

    if (!favorite) {
      this.setState({ loading: true });
      await addSong(song);
      this.setState({ loading: false, favorite: true });
    } else {
      this.setState({ loading: true });
      await removeSong(song);
      this.setState({ loading: false, favorite: false });
    }
  }

  checkFavoriteSongs = async () => {
    const { song } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const isFavorite = favoriteSongs.some((item) => (item.trackId === song.trackId));
    if (isFavorite) {
      this.setState({
        favorite: true,
      });
    }
  }

  render() {
    const { song } = this.props;
    const { loading, favorite } = this.state;

    return (
      <div>
        {loading ? <Loading />
          : (
            <div>
              <h4>
                { song.trackName }
              </h4>
              <audio data-testid="audio-component" src={ song.preview } controls>
                <track kind="captions" />
              </audio>
              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  onChange={ this.handleClick }
                  checked={ favorite }
                  data-testid={ `checkbox-music-${song.trackId}` }
                />
              </label>
            </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.object,
}.isRequired;

export default MusicCard;
