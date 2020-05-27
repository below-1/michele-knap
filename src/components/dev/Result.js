import React, { useState, useEffect, useContext } from 'react'
import { ResponsiveLineCanvas } from '@nivo/line'
import InputContext from './InputContext'

export default function Result () {
  const [state, _] = useContext(InputContext)
  const { knapsack_events: events } = state
  const dataPoints = events.map((event, index) => {
    return {
      x: index,
      y: event.payload.conv_ratio
    }
  })
  const data = [
    {
      id: "japan",
      color: "hsl(130, 70%, 50%)",
      data: dataPoints
    }
  ]
  return (
    <div className="text-lg p-4 text-center border border-gray-300">
      <div style={{ height: '400px' }}>
        <ResponsiveLineCanvas
          data={data}
          margin={{ top: 4, right: 26, bottom: 28, left: 20 }}
          xScale={{ type: 'linear' }}
          yScale={{ type: 'linear', stacked: true, min: 0, max: 1.0 }}
          curve="monotoneX"
          enableArea={true}
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
            legendOffset: 0
          }}
          axisBottom={{
            legend: 'generation',
            legendOffset: 12,
            legendPosition: 'middle'
          }}
        />
      </div>
    </div>
  )
}