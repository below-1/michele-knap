import { knapsack } from './knapsack'
import { spx } from './spx'

onmessage = (event) => {
  switch (event.data.type) {
    case 'start':
      const t0 = performance.now()
      const result = knapsack({
        ...event.data.payload,
        mutation: spx
      })
      const t1 = performance.now()
      postMessage({
        type: 'end',
        ...result,
        time: t1 - t0
      })
      break
    default:
      return
  }
}