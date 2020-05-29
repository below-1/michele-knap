import React, { useContext } from 'react'
import InputContext from './InputContext'
import CrossoverResult from './CrossoverResult'

export default function Result () {
  const [state, _] = useContext(InputContext)
  const { knap_results: results, items } = state

  return (
    <div>
      { results.map(r => (
        <CrossoverResult items={items} result={r} label={r.name.toUpperCase()} />
      ))}
    </div>
  )
}