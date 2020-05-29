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
    convergence_threshold: 0.95,
    pop_size: 100,
    prob_crossover: 0.2,
    prob_mutation: 0.9,
    max_weight: 300,
    use_convergence_threshold: true
  },
  // Info convergence per gen
  knapsack_convs: [],
  knap_results: []
}