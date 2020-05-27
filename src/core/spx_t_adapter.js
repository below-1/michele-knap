import { knapsack } from './knapsack'
import { spx } from './spx'

onmessage = (event) => {
  switch (event.data.type) {
    case 'start':
      knapsack({
        ...event.data.payload,
        event_cb: postMessage,
        mutation: spx
      })
      break
    default:
      return
  }
}