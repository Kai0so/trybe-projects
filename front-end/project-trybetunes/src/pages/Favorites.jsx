import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavoriteMusics();
  }

  getFavoriteMusics = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, favorites });
  }

  render() {
    const { favorites, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading />
          : (
            favorites.map((song) => (
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

export default Favorites;
