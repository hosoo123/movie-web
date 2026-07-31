"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { Footer } from "../_components/footer";
import { PaginationMovie } from "../_components/paginationMovie";

const api_key = "3f7806eb786a47af748865926b439e68";

type GenreItem = { id: number; name: string };

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page") || 1);

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1); 
  const [genres, setGenres] = useState<GenreItem[]>([]);

  // Genres fetch
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${api_key}`
      );
      const data = await response.json();
      setGenres(data.genres || []);
    };
    fetchGenres();
  }, []);

  // Movies fetch
  useEffect(() => {
    if (!query) { setMovies([]); setTotalResults(0); return; }

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}&api_key=${api_key}`
        );
        const data = await response.json();
        setMovies(data.results || []);
        setTotalResults(data.total_results || 0);
        setTotalPages(Math.min(data.total_pages, 500)); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query, page]);

  return (
    <div className="min-h-screen text-black">
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-12">
        <section className="col-span-8">
          <h1 className="text-3xl dark:text-white font-bold tracking-tight">Search results</h1>
          {query ? (
            <p className="text-sm text-zinc-400 mt-1 mb-6">
              {movies.length > 0
                ? `${Math.min(movies.length, 20)} results for "${query}"`
                : totalResults > 0
                ? `${totalResults} results for "${query}"`
                : `No results for "${query}"`}
            </p>
          ) : (
            <p className="text-sm text-zinc-400 mt-2 mb-6">Enter a search query</p>
          )}

          {loading ? (
            <p className="text-zinc-400">Loading...</p>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {movies.map((item) => (
                <MovieCard key={item.id} image={item.poster_path} title={item.title} rating={item.vote_average} id={item.id} size="md" />
              ))}
            </div>
          )}

          <div className="w-full pt-4">
            <PaginationMovie totalPages={totalPages} /> 
          </div>
        </section>

        <aside className="col-span-4">
          <h2 className="text-2xl font-bold tracking-tight dark:text-white">Search by genre</h2>
          <p className="text-sm text-zinc-400 mt-1 mb-6">See lists of movies by genre</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => window.location.href = `/searchFilter?genreId=${genre.id}&genreName=${encodeURIComponent(genre.name)}&page=1`}
                className="cursor-pointer px-3 py-1.5 border border-zinc-300 text-xs font-medium rounded-md text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-300 dark:hover:text-black transition"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SearchResultsContent />
    </Suspense>
  );
}