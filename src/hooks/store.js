import { useState, useContext, useEffect } from 'react'
import InputContext from 'mich/components/dev/InputContext'

export function useStoreState ({ prop, getter }) {
  const [state, _] = useContext(InputContext)
  if (prop) {
    return state[prop]
  }
  if (getter) {
    return getter(state)
  }
  return state
}


export function useStoreMutation () {
  const [_, dispatch] = useContext(InputContext)
  return dispatch
}

