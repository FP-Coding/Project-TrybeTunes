import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import MusicCard from './MusicCard';

import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    listMusic: [],
    imageAlbum: '',
    nameAlbum: '',
    nameArtistAlbum: '',
  };

  componentDidMount() {
    this.catchMusic();
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

  render() {
    const { listMusic, imageAlbum, nameAlbum, nameArtistAlbum } = this.state;
    const renderListMusic = listMusic
      .filter((_, index) => index !== 0)
      .map((musicInfo, index) => (
        <MusicCard key={ `${index}-music` } { ...musicInfo } />
      ));
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ imageAlbum } alt={ nameArtistAlbum } />
          <h2 data-testid="album-name">{nameAlbum}</h2>
          <p data-testid="artist-name">{nameArtistAlbum}</p>
        </div>
        {renderListMusic}
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
