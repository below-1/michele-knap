import React from 'react';
import { Link } from 'react-router-dom'

export default function Landing () {
  return (
    <div id="landing">

      <div className="navbar bg-white shadow-xl h-20 flex flex-row items-center justify-start px-6 shadow-lg text-gray-700">
        <div className="text-lg tracking-widest font-bold">MICHELE'S KNAPSACK</div>
        <div className="flex flex-grow flex-row justify-end">
          <Link className="px-6 font-bold" to='/dev/input'>Try It!</Link>
        </div>
      </div>

      <div className="content">
        <section className="hero w-screen h-full flex flex-col items-center justify-center">
          <div className="text-white font-bold text-4xl">Knapsack Problem meets Genetic Algorithm</div>
          <Link to="/dev/input" className="bg-blue-700 text-white px-8 py-3 font-bold text-xl rounded">Get Started!</Link>
        </section>
      </div>

      <div className="content flex flex-col items-center justify-center text-gray-600 px-24">
        <p className="text-lg font-semibold">Knapsack problem merupakan salah satu permasalahan optimasi kombinatorial, dimana algoritma penyelesaiannya memiliki kompleksitas non- polinomial dengan skala ruang solusi yang sangat besar. Permasalahan inti dari knapsack problem adalah bagaimana cara menentukan pemilihan barang dari sekumpulan barang dimana setiap barang (item) mempunyai nilai berat (weight) dan nilai keuntungan (profit) masing-masing, sehingga dari pemilihan barang tersebut didapatkan keuntungan (profit) yang maksimum tanpa melebihi kapasitas knapsack, dengan kata lain telah mencapai optimal packing (Martello, 2000).</p>
      </div>

      <footer className="bg-gray-200 py-6 px-12 flex flex-row items-center justify-between">
        <div className="text-lg tracking-widest font-bold">MICHELE'S KNAPSACK</div>
        <div className="flex flex-grow flex-row justify-end items-center">
          <Link className="px-6 font-bold" to='/dev'>Try It!</Link>
          <div className="py-2 px-4 font-semibold">Copyright &#169; Michele 2020</div>
        </div>
      </footer>
    </div>
  )
}