import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoriteList: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    await this.getFavoriteList();
    this.setState({
      isLoading: false,
    });
  }

  handleChange = async (musicInfo) => {
    this.setState({
      isLoading: true,
    });
    await removeSong(musicInfo);
    await this.getFavoriteList();
    this.setState({
      isLoading: false,
    });
  };

  getFavoriteList = async () => {
    const listFavorite = await getFavoriteSongs();
    this.setState({
      favoriteList: listFavorite,
    });
  };

  render() {
    const { handleChange, state } = this;
    const { favoriteList, isLoading } = state;
    const contentFavorite = favoriteList.length < 1 ? (
      <h2>Não há músicas Favoritadas</h2>
    ) : (
      favoriteList.map((musicFavorite, index) => (
        <div key={ musicFavorite.trackId }>
          <MusicCard { ...musicFavorite } />
          <label htmlFor={ `favorite-music-${index}` }>
            Favorita
            <input
              id={ `favorite-music-${index}` }
              type="checkbox"
              checked={ favoriteList.includes(musicFavorite) }
              onChange={ () => handleChange(musicFavorite) }
            />
          </label>
        </div>
      ))
    );
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? <Loading /> : contentFavorite}
      </div>
    );
  }
}

export default Favorites;
