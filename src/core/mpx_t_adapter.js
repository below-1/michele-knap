import { knapsack } from './knapsack'
import { mpx } from './mpx'

onmessage = (event) => {
  switch (event.data.type) {
    case 'start':
      // console.log('here')
      const result = knapsack({
        ...event.data.payload,
        mutation: mpx
      })
      // console.log(result)
      postMessage({
        type: 'end',
        ...result
      })
      break
    default:
      return
  }
}