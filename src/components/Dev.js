import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Store from './dev/Store'
import MainInput from './dev/MainInput'
import Result from './dev/Result'
import Toolbar from './dev/Toolbar'
import './Dev.css'

export default function Dev () {
  return (
    <Store>
      <div id="dev" className="pt-16">
        <Toolbar />
        <section className="my-4 mx-6">
          <Switch>
            <Route exact path="/dev/input">
              <MainInput />
            </Route>
            <Route exact path="/dev/result">
              <Result />
            </Route>
          </Switch>
        </section>
      </div>
    </Store>
  )
}