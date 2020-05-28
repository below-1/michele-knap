import { knapsack } from './knapsack'
import { spx } from './spx'

onmessage = (event) => {
  switch (event.data.type) {
    case 'start':
      const result = knapsack({
        ...event.data.payload,
        mutation: spx
      })
      postMessage({
        type: 'end',
        ...result
      })
      break
    default:
      return
  }
}