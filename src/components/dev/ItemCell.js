import React from 'react'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'

export default function ItemCell ({ value, profit, weight, index  }) {
  let cls = ['text-center text-xs font-semibold bg-gray-200 text-gray-700']
  if (value == 1) {
    cls.push('bg-blue-300')
  }
  return (
    <Tooltip
      title={`profit: ${profit}, bobot: ${weight}`}
      position="top"
    >
      <div className={cls.join(' ')}>
        {index}
      </div>
    </Tooltip>
  )
}