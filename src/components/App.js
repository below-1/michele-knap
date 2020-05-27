import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Landing from './Landing'
import About from './About'
import Dev from './Dev'
import 'mich/styles/main.css'

export default function App () {
  return (
    <div id="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/dev">
            <Dev />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}