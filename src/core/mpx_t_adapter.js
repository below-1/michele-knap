import { knapsack } from './knapsack'
import { mpx } from './mpx'

onmessage = (event) => {
  switch (event.data.type) {
    case 'start':
      knapsack({
        ...event.data.payload,
        event_cb: postMessage,
        mutation: mpx
      })
      break
    default:
      return
  }
}