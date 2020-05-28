import { range, rangeRight, maxBy, minBy, random } from 'lodash'
import { sample } from './sample'
import { generate_boundary } from './generate_boundary'

function mask({ population, ordered, max_weight, dim }) {
  return population.map(choromosome => {
    return choromosome.reduce((acc, cell, index) => {
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
  })
}

function convergence ({ masked }) {
  const agg_total = masked.reduce((acc, current) => {
    if (!acc.has(current.tprofit)) {
      acc.set(current.tprofit, 0)
    }
    const current_total = acc.get(current.tprofit)
    acc.set(current.tprofit, current_total + 1)
    return acc
  }, new Map())

  return maxBy(Array.from(agg_total.entries()), entry => entry[1])
}

function mutate ({ population, dim, pop_size, prob_mutation }) {
  let n = 0
  range(pop_size * dim).forEach(i => {
    if (Math.random() >= prob_mutation) {
      return
    }
    let i_row = Math.floor(i / pop_size)
    let i_col = Math.floor(i / pop_size) % dim
    population[i_row][i_col] = population[i_row][i_col] == 1 ? 0 : 1
    n += 1
  })
  return n
}

export function knapsack ({ items, hyper, mutation }) {
  let result = {
    generations: [],
    max_chromosome: null
  }

  const {
    pop_size,
    max_weight,
    prob_crossover,
    max_gen,
    prob_mutation,
    convergence_threshold,
    use_convergence_threshold,
    tournament_size
  } = hyper;
  let gen_counter = 0;
  const dim = items.length
  let population = range(pop_size)
    .map(i => range(dim).map(j => Math.random() > 0.5 ? 1 : 0))
  const ordered = items.map((item, index) => {
    return {
      ...item,
      t: item.profit / item.weight,
      ori_index: index
    }
  }).sort(it => it.t).reverse()

  while (gen_counter < max_gen) {
    const masked = mask({ population, ordered, max_weight, dim })
    let [max_fit, count] = convergence({ masked })
    const conv_ratio = (1.0 * count) / pop_size;

    // console.log(`max common conv: ${max_fit}, count: ${count}`)
    // console.log(`conv_ratio: ${conv_ratio}`)
    result.generations.push({
      max_fit,
      generation: gen_counter,
      conv_ratio
    })

    if (use_convergence_threshold && conv_ratio >= convergence_threshold) {
      break;
    }


    const crossover_pool = population.filter(pop => Math.random() < prob_crossover)
    mutation(crossover_pool, dim)
    const n_mutate = mutate({ population, dim, pop_size, prob_mutation })

    const max_chromosome = maxBy(masked, it => it.tprofit)
    const min_chromosome = minBy(masked, it => it.tprofit)
    const max_chromosome_index = masked.indexOf(max_chromosome)
    const min_chromosome_index = masked.indexOf(min_chromosome)

    population[min_chromosome_index] = [ ...population[max_chromosome_index] ]
    const tour_indices = range(pop_size).filter(i => i != min_chromosome_index)
    tour_indices.forEach(i => {
      const pool = sample(tour_indices, tournament_size)
      const max_index = maxBy(pool, index => masked[index].tprofit)
      population[i] = [...population[max_index]]
    })

    result.max_chromosome = max_chromosome

    gen_counter += 1
  }

  return result
}
