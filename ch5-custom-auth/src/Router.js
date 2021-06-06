import { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Public from './Public';
import Protected from './Protected';
import Profile from './Profile';

const Router = () => {
  return (
    <HashRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Public} />
        <Route exact path="/protected" component={Protected} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
