import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const TAMANHO_MINIMO_ARTIST_NAME = 2;
class Search extends Component {
  render() {
    const { artistName, onInputChange } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artistName"
            value={ artistName }
            placeholder="Nome do Artista"
            onChange={ onInputChange }
            data-testid="search-artist-input"
          />
          <button
            disabled={ artistName.length < TAMANHO_MINIMO_ARTIST_NAME }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  artistName: PropTypes.string,
  onInputChange: PropTypes.func,
}.isRequired;

export default Search;
