'use client'
import React, { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import fetcher from '../utils/fetcher'


function HomePage() {
  const [movieName, setMovieName] = useState("")
  const [query, setQuery] = useState("")

  const { data, error, isLoading } = useSWR(
    movieName ? `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${movieName}` : null,
    fetcher
  )

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMovieName(query)
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-200 mb-6">Movie Search</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={handleChange}
          className="px-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Search
        </button>
      </form>

      {isLoading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.Search?.map((movie) => (
          <Link
            key={movie.imdbID}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200"
            href={`/movie/${movie.imdbID}`}
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {movie.Title}
              </h3>
              <p className="text-gray-500">({movie.Year})</p>
            </div>
          </Link>
        ))}  
      </div>

    </div>
  )
}

export default HomePage
