import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'
import Logo from 'mich/icons/abstract.svg'
import InputContext from 'mich/components/dev/InputContext'
import useKnapsack from 'mich/hooks/knapsack'


export default function Toolbar () {
  const [state, dispatch] = useContext(InputContext)
  const history = useHistory()

  const { knapsack, done, workerState } = useKnapsack(data => {
    if (!data) return
    switch (data.type) {
      case 'end':
        dispatch({
          type: 'NEW_KNAP_RESULT',
          payload: data
        })
        break
      default:
        break
    }
  })

  useEffect(() => {
    if (workerState == 'done') {
      dispatch({
        type: 'KNAP_DONE'
      })
      history.push('/dev/result')
    }
  }, [workerState])

  let button;
  if (workerState == 'loaded' || workerState == 'load_script' || workerState == 'running') {
    button = (<FontAwesomeIcon icon="hourglass" />)
  } else {
    button = (<button 
      className="appearance-none bg-indigo-700 text-white px-4 py-1 text-lg font-bold rounded"
      onClick={() => {
        dispatch({
          type: 'CLEAR_KNAP_RESULT'
        })
        dispatch({
          type: 'KNAP_RUNNING'
        })
        knapsack(state.items, state.hyper)
      }}
    >
      Run
      <FontAwesomeIcon icon="play-circle" size="lg" className="ml-2"></FontAwesomeIcon>
    </button>)
  }

  return (
    <div className="navbar bg-gray-900 text-white h-12 flex flex-row items-center justify-start px-6 shadow-lg">
      <Link to="/" className="flex flex-row items-center">
        <img src={Logo} width="32" height="32" className="mr-4" />
        <span className="text-lg tracking-widest font-bold">MICHELE'S KNAPSACK</span>
      </Link>
      <div className="flex flex-grow flex-row justify-end items-center">
        <Link className="px-6 font-bold" to='/about'>About</Link>
        <Link className="px-6 font-bold" to='/dev/input'>Input</Link>
        <Link className="px-6 font-bold" to='/dev/result'>Hasil</Link>
        {button}
      </div>
    </div>
  )
}