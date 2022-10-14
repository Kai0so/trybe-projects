import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumSongs: [],
      artist: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {};
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const albumTrackFilter = result.filter((item) => item.trackName);
    this.setState({
      albumSongs: albumTrackFilter,
      albumName: result[0].collectionName,
      artist: result[0].artistName,
      albumImg: result[0].artworkUrl100,
    });
  }

  render() {
    const { albumSongs, artist, albumName, albumImg } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artist }</h2>
        <img src={ albumImg } alt={ albumName } />
        <h3 data-testid="album-name">{ albumName }</h3>
        <br />
        {(albumSongs.map((song) => (
          <div key={ song.trackId }>
            <MusicCard
              song={ song }
            />
          </div>
        )))}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
