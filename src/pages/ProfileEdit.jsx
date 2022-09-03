import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isRedirect: false,
    isButtonDisabled: true,
    isLoading: true,
  };

  async componentDidMount() {
    await this.getInfoUser();
    this.setState({
      isLoading: false,
    });
  }

  getInfoUser = async () => {
    const { name, email, description, image } = await getUser();
    this.setState(
      {
        name,
        email,
        description,
        image,
      },
      this.verifyInput,
    );
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.verifyInput,
    );
  };

  verifyInput = () => {
    const { name, email, description, image } = this.state;
    const verifyEmail = email.endsWith('.com')
      && email.includes('@')
      && email.split('')[0] !== '@';
    const noOneIsEmpty = name && email && verifyEmail && description && image;
    this.setState({
      isButtonDisabled: !noOneIsEmpty,
    });
  };

  saveInfos = async (infos) => {
    this.setState({
      isLoading: true,
    });
    await updateUser(infos);
    this.setState({
      isRedirect: true,
    });
  };

  render() {
    const { state, handleChange, saveInfos } = this;
    const {
      name,
      email,
      description,
      image,
      isButtonDisabled,
      isRedirect,
      isLoading,
    } = state;
    const infosUser = { name, email, description, image };
    const formProfileEdit = (
      <form>
        <label htmlFor="input-name">
          Name
          <input
            data-testid="edit-input-name"
            type="text"
            name="name"
            value={ name }
            onChange={ handleChange }
            id="input-name"
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            data-testid="edit-input-email"
            type="email"
            name="email"
            value={ email }
            onChange={ handleChange }
            id="input-email"
          />
        </label>
        <label htmlFor="input-description">
          Descrição
          <input
            data-testid="edit-input-description"
            type="text"
            name="description"
            value={ description }
            onChange={ handleChange }
            id="input-description"
          />
        </label>
        <label htmlFor="input-image">
          Image
          <input
            data-testid="edit-input-image"
            type="text"
            name="image"
            value={ image }
            onChange={ handleChange }
            id="input-image"
          />
        </label>
        <button
          type="button"
          disabled={ isButtonDisabled }
          data-testid="edit-button-save"
          onClick={ () => saveInfos(infosUser) }
        >
          Salvar
        </button>
      </form>
    );
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : formProfileEdit}
        {isRedirect && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
