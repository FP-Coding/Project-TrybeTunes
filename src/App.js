import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/album/:id"
              render={ (props) => <Album { ...props } /> }
            />
            <Route
              exact
              path="/profile/edit"
              render={ (props) => <ProfileEdit { ...props } /> }
            />
            <Route
              exact
              path="/favorites"
              render={ (props) => <Favorites { ...props } /> }
            />
            <Route
              exact
              path="/profile"
              render={ (props) => <Profile { ...props } /> }
            />
            <Route
              exact
              path="/search"
              render={ (props) => (
                <Search
                  { ...props }
                />
              ) }
            />
            <Route
              exact
              path="/"
              render={ (props) => (
                <Login
                  { ...props }
                />
              ) }
            />
            <Route path="*" render={ (props) => <NotFound { ...props } /> } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
