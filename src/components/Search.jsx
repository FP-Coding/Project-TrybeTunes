import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Loading from './Loading';
import Header from './Header';

const TAMANHO_MINIMO_ARTIST_NAME = 2;
class Search extends Component {
  state = {
    artistNameInput: '',
    artistSearch: '',
    albunsArtistSearch: [],
    isLoading: false,
    isHidden: true,
  };

  handleClickSearch = async () => {
    const { artistNameInput } = this.state;
    this.setState(
      {
        artistSearch: artistNameInput,
        artistNameInput: '',
        isLoading: true,
      },
      async () => {
        const { artistSearch } = this.state;
        const album = await searchAlbumsAPI(artistSearch);
        this.setState({
          albunsArtistSearch: album,
        });
        this.setState({
          isLoading: false,
          isHidden: false,
        });
      },
    );
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { state, handleChange, handleClickSearch } = this;
    const {
      artistNameInput,
      albunsArtistSearch,
      isLoading,
      isHidden,
      artistSearch,
    } = state;
    const renderAlbums = albunsArtistSearch.map(
      ({ artistName, collectionName, artworkUrl100, collectionId }) => (
        <Link
          to={ `/album/${collectionId}` }
          key={ collectionId }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <div>
            <img src={ artworkUrl100 } alt={ artistName } />
            <h4>{collectionName}</h4>
            <p>{artistName}</p>
          </div>
        </Link>
      ),
    );
    const sectionAlbums = (
      <section>
        <p>{`Resultado de álbuns de: ${artistSearch}`}</p>
        {renderAlbums}
      </section>
    );
    const foundOrNotFound = albunsArtistSearch.length > 0 ? (
      sectionAlbums
    ) : (
      <p hidden={ isHidden }>Nenhum álbum foi encontrado</p>
    );
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artistNameInput"
            value={ artistNameInput }
            placeholder="Nome do Artista"
            onChange={ handleChange }
            disabled={ isLoading }
            data-testid="search-artist-input"
          />
          <button
            disabled={ artistNameInput.length < TAMANHO_MINIMO_ARTIST_NAME }
            data-testid="search-artist-button"
            type="button"
            onClick={ handleClickSearch }
          >
            Pesquisar
          </button>
        </form>
        <div>{isLoading ? <Loading /> : foundOrNotFound}</div>
      </div>
    );
  }
}

Search.propTypes = {
  artistName: PropTypes.string,
  onInputChange: PropTypes.func,
}.isRequired;

export default Search;
