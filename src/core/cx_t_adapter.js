import { knapsack } from './knapsack'
import { cx } from './cx'

onmessage = (event) => {
  switch (event.data.type) {
    case 'start':
      // console.log('here')
      const t0 = performance.now()
      const result = knapsack({
        ...event.data.payload,
        mutation: cx
      })
      const t1 = performance.now()
      // console.log(result)
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