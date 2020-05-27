import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar () {
  return (
    <div className="navbar bg-indigo-800 text-white h-12 flex flex-row items-center justify-start px-6 shadow">
      <div className="text-lg tracking-widest font-bold">MICHELE'S KNAPSACK</div>
      <div className="flex flex-grow flex-row justify-end">
        <Link className="px-6 font-bold" to='/about'>About</Link>
        <Link className="px-6 font-bold" to='/dev'>Try It!</Link>
      </div>
    </div>
  );
}