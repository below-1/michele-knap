import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'
import Logo from 'mich/icons/abstract.svg'
import InputContext from './InputContext'


export default function Toolbar () {
  const [ state, dispatch ] = useContext(InputContext)
  const [ worker, setWorker ] = useState(null)
  const [algoCompleteCounter, setAlgoCompleteCounter] = useState(0)
  const history = useHistory()

  const incAlgoCounter = () => {
    setAlgoCompleteCounter(algoCompleteCounter + 1)
  }

  useEffect(() => {
    console.log(`algoCompleteCounter: ${algoCompleteCounter}`)
    if (algoCompleteCounter == 2) {
      history.push('/dev/result')
    }
  }, [algoCompleteCounter])

  useEffect(() => {
    const knapWorker = new Worker('../../core/knapsack_t_adapter.js')

    knapWorker.onmessage = worker_event => {
      switch (worker_event.data.type) {
        case 'end':
          dispatch({
            type: 'NEW_KNAP_RESULT',
            payload: worker_event.data
          })
          break
        default:
          break
      }
    }

    knapWorker.onerror = err => {
      throw err
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
    <div className="navbar bg-gray-900 text-white h-12 flex flex-row items-center justify-start px-6 shadow-lg">
      <div className="flex flex-row items-center">
        <img src={Logo} width="32" height="32" className="mr-4" />
        <span className="text-lg tracking-widest font-bold">MICHELE'S KNAPSACK</span>
      </div>
      <div className="flex flex-grow flex-row justify-end items-center">
        <Link className="px-6 font-bold" to='/about'>About</Link>
        <button 
          className="appearance-none bg-indigo-700 text-white px-4 py-1 text-lg font-bold rounded"
          onClick={onRun}
        >
          Run!
          <FontAwesomeIcon icon="play-circle" size="lg" className="ml-2"></FontAwesomeIcon>
        </button>
      </div>
    </div>
  )
}