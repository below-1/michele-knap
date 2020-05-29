import { useState, useEffect } from 'react'

// Number of algorithm
const N_ALGO = 2

export default function useKnapsack(cb) {
  const [ worker, setWorker ] = useState(null)
  const [ done, setDone ] = useState(false)
  const [ workerState, setWorkerState ] = useState('load_script')


  useEffect(() => {
    const worker = new Worker('../core/knapsack_t_adapter.js')

    setWorker(worker)
    setWorkerState('loaded')

    return function cleanUpWorker () {
      worker.terminate()
      setWorkerState('terminated')
    }
  }, [])

  useEffect(() => {
    if (!worker) {
      return
    }
    worker.onmessage = worker_event => {
      switch (worker_event.data.type) {
        case 'end':
          cb(worker_event.data)
          break
        case 'done':
          setWorkerState('done')
          break
        default:
          break
      }
    }

    worker.onerror = err => {
      setWorkerState('error')
      throw err
    }
    setWorkerState('ready')
  }, [worker])

  return {
    knapsack: worker
      ? (items, hyper) => {
          setWorkerState('running')
          worker.postMessage({
            type: 'start',
            payload: {
              items,
              hyper
            }
          })
        }
      : null,
    done,
    workerState
  }
}