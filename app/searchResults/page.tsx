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
  const query = searchParams.get("query") || searchParams.get("value") || "";
  const page = Number(searchParams.get("page") || 1);

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState<GenreItem[]>([]);

  // Genres fetch
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${api_key}`,
        );
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Genre fetch error:", err);
      }
    };
    fetchGenres();
  }, []);

  // Movies fetch
  useEffect(() => {
    if (!query) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query,
          )}&language=en-US&page=${page}&api_key=${api_key}`,
        );
        const data = await response.json();
        setMovies(data.results || []);
        setTotalResults(data.total_results || 0);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query, page]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Киноны жагсаалт хэсэг */}
        <section className="lg:col-span-8 order-2 lg:order-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Search results
          </h1>
          {query ? (
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-6">
              {movies.length > 0
                ? `${Math.min(movies.length, 20)} results for "${query}"`
                : totalResults > 0
                  ? `${totalResults} results for "${query}"`
                  : `No results for "${query}"`}
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 mb-6">
              Enter a search query
            </p>
          )}

          {loading ? (
            <p className="text-zinc-400 py-10">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movies.map((item) => (
                <MovieCard
                  key={item.id}
                  image={item.poster_path}
                  title={item.title}
                  rating={item.vote_average}
                  id={item.id}
                  size="md"
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="w-full pt-8 flex justify-center">
              <PaginationMovie totalPages={totalPages} />
            </div>
          )}
        </section>

        {/* Жанраар хайх хэсэг */}
        <aside className="lg:col-span-4 order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-zinc-200 dark:border-zinc-800 pb-6 lg:pb-0 lg:pl-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Search by genre
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-4 sm:mb-6">
            See lists of movies by genre
          </p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() =>
                  (window.location.href = `/searchFilter?genreId=${
                    genre.id
                  }&genreName=${encodeURIComponent(genre.name)}&page=1`)
                }
                className="cursor-pointer px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 text-xs font-medium rounded-md text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
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
    <Suspense
      fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}
    >
      <SearchResultsContent />
    </Suspense>
  );
}
