import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    await this.getInfoUser();
    this.setState({
      isLoading: false,
    });
  }

  getInfoUser = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({
      name,
      email,
      description,
      image,
    });
  };

  render() {
    const { name, email, description, image, isLoading } = this.state;
    const contentProfile = (
      <>
        <img data-testid="profile-image" src={ image } alt={ name } />
        <div>
          <h4>Nome</h4>
          <p>{ name }</p>
        </div>
        <div>
          <h4>E-mail</h4>
          <p>{ email }</p>
        </div>
        <div>
          <h4>Descrição</h4>
          <p>{ description }</p>
        </div>
        <Link to="/profile/edit">Editar perfil</Link>
      </>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : contentProfile }
      </div>
    );
  }
}

export default Profile;
