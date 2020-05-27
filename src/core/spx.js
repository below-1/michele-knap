import { random, range, rangeRight } from 'lodash'
import { generate_boundary } from './generate_boundary'

export function spx(pool, dimension) {
    let n = (pool.length % 2 != 0) ? pool.length - 2 : pool.length - 1
    range(0, n).map(i => {
        let a = pool[i]
        let b = pool[i + 1]
        let start = random(0, dimension - 1)
        let end = dimension
        rangeRight(start, end).forEach(j => {
            let temp = a[j]
            a[j] = b[j]
            b[j] = temp
        })
    })
}