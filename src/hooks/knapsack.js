import { useState, useContext, useEffect } from 'react'
import InputContext from 'mich/dev/components/InputContext'

export function useKnapsack(cb) {
  const [ worker, setWorker ] = useState(null)

  useEffect(() => {
    const knapWorker = new Worker('../core/knapsack_t_adapter.js')

    knapWorker.onmessage = worker_event => {
      switch (worker_event.data.type) {
        case 'end':
          cb(worker_event.data)
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

  return (items, hyper) => {
    worker.postMessage({
      type: 'start',
      payload: {
        items,
        hyper
      }
    })
  }
}