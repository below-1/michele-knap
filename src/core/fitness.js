import { range } from 'lodash'

export function fitness ({ xs, ordered, max_weight, dim }) {
  return xs.reduce((acc, cell, index) => {
      if (cell == 0) {
        acc.vori[index] = 0
        return acc
      }
      const next_total = acc.total + ordered[index].weight
      if (next_total > max_weight) {
        return acc
      }
      acc.vori[index] = 1
      acc.total = next_total
      acc.tprofit = acc.tprofit + ordered[index].profit
      return acc
    }, {
      total: 0,
      tprofit: 0,
      vori: range(dim).map(i => 0)
    })
}