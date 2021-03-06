const mpx_worker = new Worker('./mpx_t_adapter.js')
const spx_worker = new Worker('./spx_t_adapter.js')
const cx_worker = new Worker('./cx_t_adapter.js')
const N_WORKER = 3

var counter = 0

mpx_worker.onmessage = event => {
  postMessage({
    name: 'mpx',
    ...event.data
  })
  counter += 1
  if (counter >= N_WORKER) {
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
  if (counter >= N_WORKER) {
    postMessage({ type: 'done' })
    counter = 0
  }
}

spx_worker.onerror = err => {
  console.log('error in spx')
  console.log(err)
}

cx_worker.onmessage = event => {
  postMessage({
    name: 'cx',
    ...event.data
  })
  counter += 1
  if (counter >= N_WORKER) {
    postMessage({ type: 'done' })
    counter = 0
  }
}

cx_worker.onerror = err => {
  console.log('error in mpx')
  console.log(err)
}

onmessage = function (event) {
  switch (event.data.type) {
    case 'start':
      counter = 0
      mpx_worker.postMessage(event.data)
      spx_worker.postMessage(event.data)
      cx_worker.postMessage(event.data)
      break
    default:
      return
  }
}
