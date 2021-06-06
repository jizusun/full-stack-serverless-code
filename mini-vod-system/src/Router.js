import { HashRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Nav from './Nav';
import Video from './Video';
import Profile from './Profile';

const Router = () => {
  const [current, setCurrent] = useState('video');
  return (
    <HashRouter>
      <Nav current={current} />
      <Switch>
        <Route exact path="/video" component={Video} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
