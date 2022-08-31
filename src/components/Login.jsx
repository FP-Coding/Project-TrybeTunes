import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

const TAMANHO_MINIMO_LOGIN_NAME = 3;
class Login extends Component {
  render() {
    const { inputLogin, onInputChange, handleClick, isRedirect, isLoading } = this.props;
    const formulario = (
      <form>
        <input
          type="text"
          name="inputLogin"
          value={ inputLogin }
          onChange={ onInputChange }
          data-testid="login-name-input"
        />
        <button
          data-testid="login-submit-button"
          type="button"
          onClick={ handleClick }
          disabled={ inputLogin.length < TAMANHO_MINIMO_LOGIN_NAME }
        >
          Entrar
        </button>
      </form>);
    return (
      <div data-testid="page-login">
        { isLoading ? <Loading /> : formulario }
        { isRedirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

Login.propTypes = {
  inputLogin: PropTypes.string,
  onInputChange: PropTypes.func,
  createUser: PropTypes.func,
}.isRequired;

export default Login;
