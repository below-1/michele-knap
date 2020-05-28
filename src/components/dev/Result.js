import React, { useState, useEffect, useContext } from 'react'
import { ResponsiveLineCanvas } from '@nivo/line'
import InputContext from './InputContext'

export default function Result () {
  const [state, _] = useContext(InputContext)
  const { knap_results: results } = state

  useEffect(() => {
    console.log(results)
  }, [])

  // let spxConvRatios = []
  // let spxMaxFits = []
  // events.filter(ev => ev.name == 'spx').forEach((ev, index) => {
  //   spxConvRatios.push({ x: index, y: ev.payload.conv_ratio })
  //   spxMaxFits.push({ x: index, y: ev.payload.max_fit })
  // })

  // const spxData = [
  //   {
  //     id: "convergence_ratio",
  //     data: spxConvRatios
  //   }
  // ]

  // let mpxConvRatios = []
  // let mpxMaxFits = []
  // events.filter(ev => ev.name == 'mpx').forEach((ev, index) => {
  //   mpxConvRatios.push({ x: index, y: ev.payload.conv_ratio })
  //   mpxMaxFits.push({ x: index, y: ev.payload.max_fit })
  // })

  // const mpxData = [
  //   {
  //     id: "convergence_ratio",
  //     data: mpxConvRatios
  //   }
  // ]

  return (
    <div className="text-lg text-center px-12 py-4">
      {/*
      <div className="mb-8 p-4 border border-gray-300">
        <div className="text-xl font-bold text-center">Multiple Point Crossover MPX</div>
        <div style={{ height: '400px' }}>
          <ResponsiveLineCanvas
            data={spxData}
            margin={{ top: 28, right: 26, bottom: 28, left: 26 }}
            xScale={{ type: 'linear' }}
            yScale={{ type: 'linear' }}
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
              legendOffset: 4
            }}
            axisBottom={{
              legend: 'generation',
              legendOffset: 12,
              legendPosition: 'middle'
            }}
          />
        </div>
      </div>
      */}
    </div>
  )
}