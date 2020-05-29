import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputContext from './InputContext'
import CrossoverResult from './CrossoverResult'

export default function Result () {
  const [state, _] = useContext(InputContext)
  const { knap_results: results, items } = state

  return (
    <div>
      { 
        results.length == 0
        ? (
            <div 
              className="flex flex-col items-center justify-center"
              style={{ height: '500px', width: '100%'  }}>
              <FontAwesomeIcon className="text-yellow-700" icon="meh" size="6x" spin />
              <div className="text-2xl font-semibold my-4">Please hit Run button</div>
            </div>
          )
        : results.map(r => (
            <CrossoverResult items={items} result={r} label={r.name.toUpperCase()} />
          ))
      }
    </div>
  )
}