import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

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
