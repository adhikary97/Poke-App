import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PokeView from './components/PokeView';
import NavBar from './components/NavBar';
import SingleView from './components/SingleView';
import Default from './components/Default';

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={PokeView} />
        <Route path="/details" component={SingleView} />
        <Route component={Default} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
