import React from 'react';
import InputItems from './InputItems'
import InputHyper from './InputHyper'

export default function MainInput () {
  return (
    <div className="flex">
      <div className="w-1/3">
        <InputHyper></InputHyper>
      </div>
      <div className="pl-4 w-2/3">
        <InputItems></InputItems>
      </div>
    </div>
  )
}
