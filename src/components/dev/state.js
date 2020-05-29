import { range } from 'lodash'
import Chance from 'chance'

const chance = new Chance()

const items = [
  { weight: 6, profit: 7 },
  { weight: 7, profit: 5 },
  { weight: 4, profit: 8 },
  { weight: 5, profit: 6 },
  { weight: 9, profit: 8 }
]

const defState = {
  items,
  hyper: {
    max_gen: 1000,
    tournament_size: 2,
    tournament_ratio: 0.9,
    convergence_threshold: 0.9,
    pop_size: 100,
    prob_crossover: 0.6,
    prob_mutation: 0.01,
    max_weight: 300,
    use_convergence_threshold: true
  },
  // Info convergence per gen
  knapsack_convs: [],
  knap_results: [],
  running: false
}

let rawSavedState = localStorage.getItem('mich.state')
let state = rawSavedState 
  ? { 
      ...defState,
      ...JSON.parse(rawSavedState)
    }
  : defState

export default state