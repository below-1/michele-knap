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
  const bestWeight = result.best_weight
  const bestFit = result.best_fit
  const execTime = result.time
  const maxChromosome = result.max_chromosome.vori

  const temp_1 = result.generations.map((gen, index) => {
    return {
      x: index,
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
        <div className="font-semibold text-lg flex items-center py-2 border-b border-gray-300">
          <FontAwesomeIcon className="mr-2" icon="coins" />
          <span className="mr-8">Best Profit:</span>
          <span>{bestFit}</span>
        </div>
        <div className="font-semibold text-lg flex items-center py-2 border-b border-gray-300">
          <FontAwesomeIcon className="mr-2" icon="weight-hanging" />
          <span className="mr-8">Best Weight:</span>
          <span>{bestWeight}</span>
        </div>
        <div className="font-semibold text-lg flex items-center py-2 border-b border-gray-300">
          <FontAwesomeIcon className="mr-2" icon="hourglass" />
          <span className="mr-8">Time:</span>
          <span>{execTime} ms</span>
        </div>
      </div>
      <div className="px-4 flex">
        <div className="w-1/3">
          <div className="text-lg text-gray-600 font-bold">Knapsack</div>
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
          <div className="text-lg text-gray-600 font-semibold">Convergence</div>
          <div style={{ height: '400px' }}>
            <ResponsiveLineCanvas
              data={lineChartData}
              margin={{ top: 28, right: 26, bottom: 28, left: 26 }}
              xScale={{ type: 'linear' }}
              yScale={{ type: 'linear', max: 1 }}
              axisLeft={{
                tickValues: [
                    0,
                    0.5,
                    1
                ],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'convergence ratio',
                legendOffset: 10
              }}
              axisBottom={{
                legend: 'generation',
                legendOffset: 10,
                legendPosition: 'middle'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}