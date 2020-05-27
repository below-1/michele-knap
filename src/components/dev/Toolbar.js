import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Logo from 'mich/icons/abstract.svg'
import InputContext from './InputContext'


export default function Toolbar () {
  const [ state, dispatch ] = useContext(InputContext)
  const [ worker, setWorker ] = useState(null)
  const [ observable, setObservable ] = useState(null)

  useEffect(() => {
    const knapWorker = new Worker('../../core/knapsack_t_adapter.js')

    knapWorker.onmessage = worker_event => {
      switch (worker_event.data.type) {
        case 'generation':
          dispatch({
            type: 'KP_GEN',
            payload: worker_event.data
          })
          break
        case 'end':
          console.log('ending')
          break
        default:
          break
      }
    }

    knapWorker.onerror = err => {
      console.log('worker error')
      console.log(err)
    }

    setWorker(knapWorker)

    return function cleanUpWorker () {
      if (knapWorker) {
        knapWorker.terminate()
      }
    }
  }, [])

  function onRun () {
    if (worker == null) {
      return
    }

    worker.postMessage({
      type: 'start',
      payload: {
        items: state.items,
        hyper: state.hyper
      }
    })
  }

  return (
    <div className="navbar bg-white h-16 flex flex-row items-center justify-start px-6 shadow-lg text-gray-700">
      <div className="flex flex-row items-center">
        <img src={Logo} width="32" height="32" className="mr-4" />
        <span className="text-lg tracking-widest font-bold">MICHELE'S KNAPSACK</span>
      </div>
      <div className="flex flex-grow flex-row justify-end items-center">
        <Link className="px-6 font-bold" to='/about'>About</Link>
        <button 
          className="appearance-none bg-indigo-700 text-white px-4 py-2 text-lg font-bold rounded"
          onClick={onRun}
        >
          Run!
          <FontAwesomeIcon icon="play-circle" size="lg" className="ml-2"></FontAwesomeIcon>
        </button>
      </div>
    </div>
  )
}