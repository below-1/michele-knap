import { range, rangeRight, maxBy, minBy, random } from 'lodash'
import { sample } from './sample'
import { generate_boundary } from './generate_boundary'
import { fitness } from './fitness'

function mask({ population, ordered, max_weight, dim }) {
  return population.map(choromosome => 
    fitness({ xs: choromosome, ordered, max_weight, dim })
  )
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
    if (random() <= prob_mutation) {
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
    max_chromosome: null,
    best_fit: 0,
    best_weight: 0
  }

  const {
    pop_size,
    max_weight,
    prob_crossover,
    max_gen,
    prob_mutation,
    convergence_threshold,
    use_convergence_threshold,
    tournament_size,
    tournament_ratio
  } = hyper;
  let gen_counter = 0;
  const dim = items.length
  let population = range(pop_size)
    .map(i => range(dim).map(j => random() > 0.5 ? 1 : 0))
  const ordered = items.map((item, index) => {
    return {
      ...item,
      t: item.profit / item.weight,
      ori_index: index
    }
  }).sort(it => it.t).reverse()

  while (gen_counter < max_gen) {
    let masked = mask({ population, ordered, max_weight, dim })
    let [max_fit, count] = convergence({ masked })
    const conv_ratio = (1.0 * count) / pop_size;

    // console.log(`max common conv: ${max_fit}, count: ${count}`)
    // console.log(`conv_ratio: ${conv_ratio}`)
    result.generations.push({
      max_fit,
      generation: gen_counter,
      conv_ratio
    })

    // Stoping condition
    if (use_convergence_threshold && conv_ratio >= convergence_threshold) {
      break;
    }

    // Crossover
    const crossover_pool = population.filter(pop => random() < prob_crossover)
    if (crossover_pool.length >= 2) {
      mutation(crossover_pool, dim)
    }

    // Mutation
    mutate({ population, dim, pop_size, prob_mutation })

    masked = mask({ population, ordered, max_weight, dim })
    const max_chromosome = maxBy(masked, it => it.tprofit)
    const min_chromosome = minBy(masked, it => it.tprofit)
    const max_chromosome_index = masked.indexOf(max_chromosome)
    const min_chromosome_index = masked.indexOf(min_chromosome)
    // Elitisme
    population[min_chromosome_index] = [ ...population[max_chromosome_index] ]
    // Tournament
    const n_tour = Math.floor(pop_size * tournament_ratio)
    // console.log(`n_tour: ${n_tour}`)
    const tour_indices = sample( range(pop_size).filter(i => i != min_chromosome_index), n_tour )
    // console.log(`tour_indices: ${tour_indices}`)
    tour_indices.forEach(i => {
      const pool = sample(tour_indices, tournament_size)
      const max_index = maxBy(pool, index => masked[index].tprofit)
      population[i] = [...population[max_index]]
    })

    result.max_chromosome = max_chromosome
    result.best_fit = masked[max_chromosome_index].tprofit
    result.best_weight = masked[max_chromosome_index].total

    gen_counter += 1
  }

  return result
}
