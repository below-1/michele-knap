import { range, rangeRight } from 'lodash'
import { generate_boundary } from './generate_boundary'

export function mpx (pool, dimension) {
    let n = (pool.length % 2 != 0) ? pool.length - 2 : pool.length - 1
    range(n).map(i => {
        let a = pool[i]
        let b = pool[i + 1]
        // random position
        const [start, end] = generate_boundary(dimension)
        rangeRight(start, end).forEach(j => {
            let temp = a[j]
            a[j] = b[j]
            b[j] = temp
        })
    })
}