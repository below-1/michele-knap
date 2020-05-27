import React, { useReducer } from 'react'
import InputContext from './InputContext'
import initialState from './state'
import Reducer from './reducer'

export default function Store ({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
    <InputContext.Provider value={[state, dispatch]}>
      {children}
    </InputContext.Provider>
  )
}
