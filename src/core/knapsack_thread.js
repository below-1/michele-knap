import { knapsack } from './knapsack'
import { mpx } from './mpx'

function event_cb (event) {
  postMessage(event)
}

onmessage = function (event) {
  switch (event.data.type) {
    case 'start':
      knapsack({
        ...event.data.payload,
        event_cb,
        mutation: mpx
      })
      break
    default:
      return
  }
}
