import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

import { createUser } from '../services/userAPI';

const TAMANHO_MINIMO_LOGIN_NAME = 3;
class Login extends Component {
  state = {
    inputLogin: '',
    isRedirect: false,
    isLoading: false,
  };

  handleClickLogin = async () => {
    const { inputLogin } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: inputLogin });
    this.setState({
      isRedirect: true,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { state, handleClickLogin, handleChange } = this;
    const { inputLogin, isRedirect, isLoading } = state;

    const formulario = (
      <form>
        <input
          type="text"
          name="inputLogin"
          value={ inputLogin }
          onChange={ handleChange }
          data-testid="login-name-input"
        />
        <button
          data-testid="login-submit-button"
          type="button"
          onClick={ handleClickLogin }
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
