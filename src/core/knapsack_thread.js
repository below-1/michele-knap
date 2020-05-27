import { knapsack } from './knapsack'

function event_cb (event) {
    postMessage(event)
}

onmessage = function (event) {
    console.log('got event from main thread')
    console.log(JSON.stringify(event.data))
    // throw new Error('must be visible in main thread')
    switch (event.data.type) {
        case 'start':
            knapsack({
                ...event.data.payload,
                event_cb
            })
            break
        default:
            return
    }
}
