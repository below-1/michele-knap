import { random, range } from 'lodash'

export function generate_boundary (dimension) {
    const max_tries = 10
    const start = random(0, dimension - 1, false)
    let end = range(start, dimension, false)
    return [start, end]
}