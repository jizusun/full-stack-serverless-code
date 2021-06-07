import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useState } from 'react';
import Nav from './Nav';
import Video from './Video';
import Profile from './Profile';
import Learn from './Learn';

const Router = () => {
  const [current, setCurrent] = useState('video');
  const [isUserAuthenticated, setIsUserAuthenticated] =
    useState(true);
  return (
    <HashRouter>
      <Nav current={current} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return isUserAuthenticated ? (
              <Redirect to="/video" />
            ) : (
              <Redirect to="/learn" />
            );
          }}
        />
        <Route exact path="/learn" component={Learn} />
        <Route exact path="/video" component={Video} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
