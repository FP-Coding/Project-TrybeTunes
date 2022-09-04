import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

import getMusics from '../services/musicsAPI';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      listMusic: [],
      favoriteMusicSongs: [],
      imageAlbum: '',
      nameAlbum: '',
      nameArtistAlbum: '',
      isLoading: false,
    };
  }

  async componentDidMount() {
    await this.getSongsFavorits();
    await this.catchMusic();
  }

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
    const { favoriteMusicSongs } = this.state;
    this.setState({
      isLoading: true,
    });
    const elementFavoritExist = favoriteMusicSongs.some(
      ({ trackId }) => trackId === musicInfo.trackId,
    );
    if (elementFavoritExist) await removeSong(musicInfo);
    else await addSong(musicInfo);
    await this.getSongsFavorits();
    this.setState({
      isLoading: false,
    });
  };

  getSongsFavorits = async () => {
    const dataSongs = await getFavoriteSongs();
    this.setState({
      favoriteMusicSongs: dataSongs,
    });
  };

  render() {
    const { handleCheckedMusicFavorites, state } = this;
    const {
      listMusic,
      imageAlbum,
      nameAlbum,
      nameArtistAlbum,
      isLoading,
      favoriteMusicSongs,
    } = state;
    const renderListMusic = listMusic
      .filter((_, index) => index !== 0)
      .map((musicInfo, index) => (
        <div key={ `${index}-music` }>
          <MusicCard { ...musicInfo } />
          <label htmlFor={ `${index}-music` }>
            Favoritar
            <input
              type="checkbox"
              id={ `${index}-music` }
              data-testid={ `checkbox-music-${musicInfo.trackId}` }
              onClick={ async () => {
                await handleCheckedMusicFavorites(musicInfo);
              } }
              defaultChecked={ favoriteMusicSongs !== null && favoriteMusicSongs.some(
                ({ trackId }) => trackId === musicInfo.trackId,
              ) }
            />
          </label>
        </div>
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
