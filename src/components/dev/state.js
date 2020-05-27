import { range } from 'lodash'
import Chance from 'chance'

const chance = new Chance()

const items = range(100).map(i => {
  return {
    profit: chance.natural({ min: 4, max: 15 }),
    weight: chance.natural({ min: 4, max: 15 })
  }
})

export default {
  items,
  hyper: {
    max_gen: 100,
    tournament_size: 2,
    convergence_threshold: 0.9,
    pop_size: 100,
    prob_crossover: 0.3,
    prob_mutation: 0.01,
    max_weight: 250,
    use_convergence_threshold: false
  },
  // Info convergence per gen
  knapsack_convs: []
}