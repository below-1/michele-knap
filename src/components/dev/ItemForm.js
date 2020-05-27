import React from 'react'
import { useForm } from "react-hook-form"

export default function ItemForm (options) {
  const { submit, id } = options;
  const defaultValues = options.default ? options.default : {};
  const { register, handleSubmit, watch, errors } = useForm({ defaultValues });

  return (
    <form id={id} onSubmit={handleSubmit(submit)}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Profit          
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" 
          min="0"
          name="profit"
          placeholder="Profit" 
          ref={register({ required: true })}
        />
        <div className="text-red-600 text-xs font-semibold">{ errors.profit && 'profit item harus diisi'}</div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Bobot
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" 
          min="0"
          name="weight"
          placeholder="Bobot" 
          ref={register({ required: true })}
        />
        <div className="text-red-600 text-xs font-semibold">{ errors.weight && 'bobot item harus diisi'}</div>
      </div>
    </form>
  )
}