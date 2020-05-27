import { range } from 'lodash'
import { mpx } from './mpx'
import { sample } from './sample'
import { knapsack } from './knapsack'

test('sample must works correctly', () => {
  const all = [
     1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
    85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99
  ]
  const take = 2
  const result = sample(all, take)
  expect(result.length).toBe(take)
  result.forEach(it => {
    expect(all.includes(it)).toBe(true)
  })
})

test('knapsack must works correctly', () => {
  const items = [
    { profit: 7, weight: 6 },
    { profit: 5, weight: 7 },
    { profit: 8, weight: 4 },
    { profit: 6, weight: 5 },
    { profit: 8, weight: 9 }
  ]
  const hyper = {
    max_gen: 100,
    tournament_size: 2,
    convergence_threshold: 0.9,
    pop_size: 100,
    prob_crossover: 0.3,
    prob_mutation: 0.01,
    max_weight: 15,
    use_convergence_threshold: true
  }

  const result = knapsack({
    items,
    hyper,
    event_cb: (foo) => {
      console.log(foo)
    },
    mutation: mpx
  })
})