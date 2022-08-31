import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Loading from './Loading';

class Header extends Component {
  state = {
    isLoading: true,
    userInfos: {},
  };

  async componentDidMount() {
    const user = await this.catchUser();
    this.setState({
      userInfos: user,
      isLoading: false,
    });
  }

  catchUser = async () => {
    const user = await getUser();
    return user;
  };

  render() {
    const { userInfos, isLoading } = this.state;
    const header = (
      <header data-testid="header-component">
        <div>
          <p>
            <span>Olá, </span>
            <span data-testid="header-user-name">{userInfos.name}</span>
          </p>
          <nav>
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            <Link to="/profile" data-testid="link-to-profile">My Profile</Link>
          </nav>
        </div>
      </header>
    );
    return (
      <div>
        {isLoading ? <Loading /> : header}
      </div>
    );
  }
}

export default Header;
