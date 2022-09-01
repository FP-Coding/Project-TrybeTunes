import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import MusicCard from './MusicCard';

import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  state = {
    listMusic: [],
    favoriteMusicSongs: [],
    imageAlbum: '',
    nameAlbum: '',
    nameArtistAlbum: '',
    isLoading: false,
  };

  componentDidMount() {
    this.catchMusic();
    this.getFavorites();
  }

  getFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteMusicSongs: favoriteSongs,
    });
  };

  catchMusic = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicList = await getMusics(id);
    this.setState({
      listMusic: musicList,
      imageAlbum: musicList[0].artworkUrl100,
      nameArtistAlbum: musicList[0].artistName,
      nameAlbum: musicList[0].collectionName,
    });
  };

  handleCheckedMusicFavorites = async (musicInfo) => {
    this.setState({
      isLoading: true,
    });
    const favoritesMusics = await getFavoriteSongs();
    this.setState({
      favoriteMusicSongs: favoritesMusics,
    });
    if (this.isFavorite(musicInfo)) {
      await removeSong(musicInfo);
    } else {
      await addSong(musicInfo);
    }
    this.setState({
      isLoading: false,
    });
  };

  isFavorite = ({ trackId: id }) => {
    const { favoriteMusicSongs } = this.state;
    return favoriteMusicSongs.some(({ trackId }) => trackId === id);
  };

  render() {
    const { handleCheckedMusicFavorites, state } = this;
    const {
      listMusic,
      imageAlbum,
      nameAlbum,
      nameArtistAlbum,
      isLoading,
    } = state;
    const renderListMusic = listMusic
      .filter((_, index) => index !== 0)
      .map((musicInfo, index) => (
        (
          <div key={ `${index}-music` }>
            <MusicCard { ...musicInfo } />
            <label htmlFor={ `${index}-music` }>
              Favoritar
              <input
                data-testid={ `checkbox-music-${musicInfo.trackId}` }
                id={ `${index}-music` }
                checked={ this.isFavorite(musicInfo) }
                type="checkbox"
                onChange={ () => handleCheckedMusicFavorites(musicInfo) }
              />
            </label>
          </div>
        )
      ));
    const infoAlbum = (
      <div>
        <img src={ imageAlbum } alt={ nameArtistAlbum } />
        <h2 data-testid="album-name">{nameAlbum}</h2>
        <p data-testid="artist-name">{nameArtistAlbum}</p>
      </div>
    );
    const contentMusics = (
      <>
        {infoAlbum}
        {renderListMusic}
      </>
    );
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading /> : contentMusics}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: {
      id: PropTypes.string,
    },
  }),
}.isRequired;

export default Album;
