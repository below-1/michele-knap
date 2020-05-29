const mpx_worker = new Worker('./mpx_t_adapter.js')
const spx_worker = new Worker('./spx_t_adapter.js')

var counter = 0

mpx_worker.onmessage = event => {
  postMessage({
    name: 'mpx',
    ...event.data
  })
  counter += 1
  if (counter >= 2) {
    postMessage({ type: 'done' })
    counter = 0
  }
}

mpx_worker.onerror = err => {
  console.log('error in mpx')
  console.log(err)
}

spx_worker.onmessage = event => {
  postMessage({
    name: 'spx',
    ...event.data
  })
  counter += 1
  if (counter >= 2) {
    postMessage({ type: 'done' })
    counter = 0
  }
}

spx_worker.onerror = err => {
  console.log('error in spx')
  console.log(err)
}

onmessage = function (event) {
  switch (event.data.type) {
    case 'start':
      counter = 0
      mpx_worker.postMessage(event.data)
      spx_worker.postMessage(event.data)
      break
    default:
      return
  }
}
