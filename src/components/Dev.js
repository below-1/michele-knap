import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Switch, Route, Link } from 'react-router-dom'
import Store from './dev/Store'
import MainInput from './dev/MainInput'
import Result from './dev/Result'
import Toolbar from './dev/Toolbar'
import InputContext from './dev/InputContext'
import './Dev.css'

function DevContent () {
  const [ state, dispatch ] = useContext(InputContext)
  const { running } = state
  return (
    <div id="dev" className="pt-16">
      <Toolbar />
      <section className="my-4 mx-6">
        {
          running
          ? (
              <div 
                className="flex flex-col items-center justify-center"
                style={{ height: '500px', width: '100%'  }}>
                <FontAwesomeIcon className="text-blue-700" icon="compact-disc" size="6x" spin />
                <div className="text-2xl font-semibold my-4">Now Running...</div>
              </div>
            )
          : (
              <Switch>
                <Route exact path="/dev/input">
                  <MainInput />
                </Route>
                <Route exact path="/dev/result">
                  <Result />
                </Route>
              </Switch>
            )
        }
        
      </section>
      <footer className="bg-gray-200 py-6 px-12 flex flex-row items-center justify-between">
        <div className="text-lg tracking-widest font-bold">MICHELE'S KNAPSACK</div>
        <div className="flex flex-grow flex-row justify-end">
          <div className="py-2 px-4 font-semibold">Copyright &#169; Michele 2020</div>
        </div>
      </footer>
    </div>
  )
}

export default function Dev () {
  return (
    <Store>
      <DevContent />     
    </Store>
  )
}