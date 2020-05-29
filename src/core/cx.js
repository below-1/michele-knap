import { random, range, rangeRight } from 'lodash'
import { generate_boundary } from './generate_boundary'

function exchange(main, secondary) {
    const n = main.length
    let c1 = range(n).map(i => null)
    let bit_index = 0;
    let visited = [];

    c1[bit_index] = main[bit_index]
    visited.push(c1[bit_index])

    while (true) {
        let t1 = secondary[bit_index]
        if (visited.includes(t1)) {
            break
        }
        bit_index = main.indexOf(t1)
        c1[bit_index] = t1
        visited.push(c1[bit_index])
    }
    return c1.map((cell, i) => {
        if (cell == null) {
            return secondary[i]
        }
        return cell
    })
}

export function _cx (xs, ys) {
    let main, secondary;
    if (random() > 0.5) {
        main = xs;
        secondary = ys;
    } else {
        main = ys;
        secondary = xs;
    }
    const o1 = exchange(main, secondary)
    const o2 = exchange(secondary, main)
    return [o1, o2]
}

export function cx(pool, dimension) {
    let n = (pool.length % 2 != 0) ? pool.length - 2 : pool.length - 1
    range(0, n).forEach(i => {
        let a = pool[i]
        let b = pool[i + 1]
        let [o1, o2] = _cx(a, b)
        pool[i] = o1
        pool[i + 1] = o2
    })
}