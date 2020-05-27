import React, { useState, useEffect, useContext } from 'react'
import InputContext from './InputContext'

export default function Result () {
  const [state, _] = useContext(InputContext)
  const { knapsack_events: events } = state
  const dataPoints = events.map(event => {
    return {
      x: event.payload.generation * 100,
      y: event.payload.conv_ratio * 100000
    }
  })
  return (
    <div className="text-lg p-12 text-center">
      <div style={{ height: '400px' }}>
      </div>
    </div>
  )
}