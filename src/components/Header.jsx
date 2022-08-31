import React, { Component } from 'react';
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
        <p>
          <span>User:</span>
          <span data-testid="header-user-name">{userInfos.name}</span>
        </p>
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
