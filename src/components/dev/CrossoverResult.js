import React, { useState, useEffect, useContext } from 'react'
import { ResponsiveLineCanvas } from '@nivo/line'
import { ResponsiveWaffle } from '@nivo/waffle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputContext from './InputContext'
import ItemCell from './ItemCell'

export default function CrossoverResult ({
  result,
  items,
  label
}) {
  const bestGen = result.best_gen
  const bestWeight = result.best_weight
  const bestFit = result.best_fit
  const worstWeight = result.worst_weight
  const worstFit = result.worst_fit
  const execTime = result.time
  const maxChromosome = result.max_chromosome.vori

  const temp_1 = result.generations.map((gen, index) => {
    return {
      x: index + 1,
      y: gen.conv_ratio
    }
  })

  const lineChartData = [
    {
      id: 'convergence',
      data: temp_1
    }
  ]

  return (
    <div className="border border-gray-300 mb-8">
      <div className="flex justify-between items-center mb-3 border-b border-gray-300 text-gray-700 px-4 py-2">
        <div className="text-2xl font-bold text-left">
          {label}
        </div>
      </div>
      <div className="px-4 grid grid-cols-3 gap-8 mb-8 text-gray-700">
        <div class="rounded border border-gray-300">
          <div className="font-semibold text-lg flex items-center p-2 border-b border-gray-300">
            <FontAwesomeIcon className="mr-2" icon="coins" />
            <span className="mr-2">Best Profit:</span>
            <span>{bestFit}</span>
          </div>
          <div className="font-semibold text-lg flex items-center p-2 border-b border-gray-300">
            <FontAwesomeIcon className="mr-2" icon="weight-hanging" />
            <span className="mr-4">Best Weight:</span>
            <span>{bestWeight}</span>
          </div>
        </div>
        <div class="rounded border border-gray-300">
          <div className="font-semibold text-lg flex items-center p-2 border-b border-gray-300">
            <FontAwesomeIcon className="mr-2" icon="coins" />
            <span className="mr-2">Worst Profit:</span>
            <span>{worstFit}</span>
          </div>
          <div className="font-semibold text-lg flex items-center p-2 border-b border-gray-300">
            <FontAwesomeIcon className="mr-2" icon="weight-hanging" />
            <span className="mr-4">Worst Weight:</span>
            <span>{worstWeight}</span>
          </div>
        </div>
        <div class="rounded border border-gray-300">
          <div className="font-semibold text-lg flex items-center p-2 border-b border-gray-300">
            <FontAwesomeIcon className="mr-2" icon="weight-hanging" />
            <span className="mr-4">Best Generation:</span>
            <span>{bestGen}</span>
          </div>
          <div className="font-semibold text-lg flex items-center p-2 border-b border-gray-300">
            <FontAwesomeIcon className="mr-2" icon="hourglass" />
            <span className="mr-8">Time:</span>
            <span>{execTime} ms</span>
          </div>
        </div>
      </div>
      <div className="px-4 flex">
        <div className="w-1/3">
          <div className="grid grid-cols-6 gap-2 py-4">
            {
              maxChromosome.map((cell, index) => (
                <ItemCell 
                  key={index}
                  value={cell} 
                  profit={items[index].profit}
                  weight={items[index].weight}
                  index={index + 1}
                />
              ))
            }
          </div>
        </div>

        <div className="w-2/3 ml-4">
          <div style={{ height: '400px' }}>
            <ResponsiveLineCanvas
              data={lineChartData}
              margin={{ top: 28, right: 26, bottom: 40, left: 26 }}
              xScale={{ type: 'linear' }}
              yScale={{ type: 'linear', max: 1 }}
              axisLeft={{
                tickValues: [0, 1],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'convergence population',
                legendOffset: 10
              }}
              axisBottom={{
                legend: 'generation',
                legendOffset: 30,
                legendPosition: 'middle'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}