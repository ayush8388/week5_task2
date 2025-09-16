import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import fetcher from '../../../utils/fetcher'


function MovieDetails() {
    const router = useRouter()
    const {id} = router.query
  
    const {data} = useSWR(
        id? `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${id}` : null, 
        fetcher
    )
    if (!data) return <p className="text-blue-500">Loading movie details...</p>

  return (
   <div className="min-h-screen flex flex-col items-center py-10 px-6">
      <Link href="/" className="mb-6  px-4 py-2 bg-gray-600 rounded hover:bg-gray-800">
        ← Back to Search
      </Link>

      <h1 className="text-3xl font-bold text-gray-600 mb-6">
        {data.Title} ({data.Year})
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-4xl">
        <img
          src={ data.Poster}
          alt={data.Title}
          className="w-72 rounded-lg shadow"
        />

        <div className="space-y-3">
          <p><span className="font-semibold">Genre:</span> {data.Genre}</p>
          <p><span className="font-semibold">Director:</span> {data.Director}</p>
          <p><span className="font-semibold">Actors:</span> {data.Actors}</p>
          <p><span className="font-semibold">Plot:</span> {data.Plot}</p>
          <p><span className="font-semibold">Language:</span> {data.Language}</p>
          <p><span className="font-semibold">IMDB Rating:</span> ⭐ {data.imdbRating}</p>
          <p><span className="font-semibold">Awards:</span> {data.Awards}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails