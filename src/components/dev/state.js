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
    max_gen: 1000,
    tournament_size: 10,
    convergence_threshold: 0.8,
    pop_size: 100,
    prob_crossover: 0.6,
    prob_mutation: 0.4,
    max_weight: 600,
    use_convergence_threshold: true
  },
  // Info convergence per gen
  knapsack_convs: [],
  knap_results: []
}