'use client'
import axios from 'axios'
import React, { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)

function HomePage() {
  const [movieName, setMovieName] = useState("")
  const [query, setQuery] = useState("")

  const { data, error, isLoading } = useSWR(
    movieName ? `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${movieName}` : null,
    fetcher
  )

  const handleChange = (e) => {
    setQuery(e.target.value)
    console.log(query)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMovieName(query)
    console.log(movieName)
  }

  return (
    <div>
      <h1>Movie Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Name"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div>
        {data?.Search?.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title} ({movie.Year})</h3>
            <img src={movie.Poster} alt={movie.Title} width={100} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
