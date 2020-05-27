export default {
  items: [
    { profit: 7, weight: 6 },
    { profit: 5, weight: 7 },
    { profit: 8, weight: 4 },
    { profit: 6, weight: 5 },
    { profit: 8, weight: 9 }
  ],
  hyper: {
    max_gen: 100,
    tournament_size: 2,
    convergence_threshold: 0.9,
    pop_size: 100,
    prob_crossover: 0.3,
    prob_mutation: 0.01,
    max_weight: 15
  },
  knapsack_events: []
}