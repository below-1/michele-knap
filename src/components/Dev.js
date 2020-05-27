import React from 'react';
import Store from './dev/Store'
import InputItems from './dev/InputItems'
import InputHyper from './dev/InputHyper'
import Result from './dev/Result'
import Toolbar from './dev/Toolbar'
import './Dev.css'

export default function Dev () {
  return (
    <Store>
      <div id="dev" className="pt-16">
        <Toolbar />
        <section className="my-4 mx-6">
          <div className="flex flex-row -mx-2">
            <div className="text-gray-700 w-1/3 px-2">
              <InputItems></InputItems>
              <InputHyper></InputHyper>
            </div>

            <div className="w-2/3 px-2">
              <Result />
            </div>
          </div>
        </section>
      </div>
    </Store>
  )
}