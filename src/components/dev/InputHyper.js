import React, { useState, useContext } from 'react'
import InputContext from './InputContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from "react-hook-form"

function ContentForm ({ id, submit }) {
  const [state, dispatch] = useContext(InputContext)
  const { hyper } = state
  const { register, handleSubmit, watch, errors } = useForm({ defaultValues: hyper });
  return (
    <form 
      id={id}
      onSubmit={handleSubmit(submit)}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Max Weight
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" 
          min="0"
          name="max_weight"
          placeholder="max_weight" 
          ref={register({ required: true })}
        />
        <div className="text-red-600 text-xs font-semibold">{ errors.max_weight && 'maximum weight cant be blank'}</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Max Generation
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" 
          min="0"
          name="max_gen"
          placeholder="maximum generation" 
          ref={register({ required: true })}
        />
        <div className="text-red-600 text-xs font-semibold">{ errors.max_gen && 'maximum generation cant be blank'}</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Size of Population
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" 
          min="0"
          name="pop_size"
          placeholder="size of population" 
          ref={register({ required: true })}
        />
        <div className="text-red-600 text-xs font-semibold">{ errors.pop_size && 'size of population cant be blank'}</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Convergence Threshold
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" 
          min="0"
          max="1"
          step="0.01"
          name="convergence_threshold"
          placeholder="Convergence Threshold" 
          ref={register({ required: true })}
        />
        <div className="text-red-600 text-xs font-semibold">{ errors.convergence_threshold && 'Convergence Threshold cant be blank'}</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Crossover Threshold
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" 
          min="0"
          max="1"
          step="0.01"
          name="prob_crossover"
          placeholder="Crossover Threshold" 
          ref={register({ required: true })}
        />
        <div className="text-red-600 text-xs font-semibold">{ errors.prob_crossover && 'Crossover Threshold cant be blank'}</div>
      </div>
    </form>
  )
}

function Content () {
  return (
    <div className="px-4 py-4">
      <ContentForm 
        id='content-form'
        submit={data => {
          console.log(data)
        }}
      />
    </div>
  )
}

function Toggler ({ show, toggle }) {
  return (<div className="flex flex-row justify-between items-center px-4">

    <div className="text-lg font-bold">Parameters</div>

    <button 
      onClick={toggle}
      className="appearance-non px-2 py-0 border border-gray-200"
    >
      <FontAwesomeIcon 
        icon={ show ? 'caret-left' : 'caret-down' }
        size="lg"
      />
    </button>
  </div>)
}

export default function InputHyper () {
  const [ showParams, setShowParams ] = useState(false)
  return (
    <div className="py-4 border border-gray-300 mt-2">
      <Toggler
        show={showParams}
        toggle={() => setShowParams(!showParams)}
      />
      { showParams && <Content /> }
    </div>
  )
}