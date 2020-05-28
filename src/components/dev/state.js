import { range } from 'lodash'
import Chance from 'chance'

const chance = new Chance()

const items = range(50).map(i => {
  return {
    profit: chance.natural({ min: 4, max: 15 }),
    weight: chance.natural({ min: 4, max: 15 })
  }
})

export default {
  items,
  hyper: {
    max_gen: 10,
    tournament_size: 2,
    convergence_threshold: 0.9,
    pop_size: 100,
    prob_crossover: 0.3,
    prob_mutation: 0.01,
    max_weight: 120,
    use_convergence_threshold: true
  },
  // Info convergence per gen
  knapsack_convs: [],
  knap_results: []
}