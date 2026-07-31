"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { Footer } from "../_components/footer";
import { PaginationMovie } from "../_components/paginationMovie";

const api_key = "3f7806eb786a47af748865926b439e68";

type GenreItem = { id: number; name: string };

function SearchFilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const genreId = searchParams.get("genreId") || "";
  const genreName = searchParams.get("genreName") || "";
  const genreIdsParam = searchParams.get("genreIds") || "";
  const genreNamesParam = searchParams.get("genreNames") || "";
  const page = Number(searchParams.get("page") || 1);

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState<GenreItem[]>([]);

  const selectedGenreIds = useMemo(() => {
    if (genreIdsParam)
      return genreIdsParam.split(",").filter(Boolean).map(Number);
    if (genreId) return [Number(genreId)];
    return [];
  }, [genreId, genreIdsParam]);

  const selectedGenreNames = useMemo(() => {
    if (genreNamesParam) return genreNamesParam.split(",").filter(Boolean);
    if (genreName) return [genreName];
    return [];
  }, [genreName, genreNamesParam]);

  // Genres fetch
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${api_key}`,
      );
      const data = await response.json();
      setGenres(data.genres || []);
    };
    fetchGenres();
  }, []);

  // Movies fetch
  useEffect(() => {
    if (!query && selectedGenreIds.length === 0) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url =
          selectedGenreIds.length > 0
            ? `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&api_key=${api_key}&with_genres=${selectedGenreIds.join(",")}`
            : `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}&api_key=${api_key}`;

        const response = await fetch(url);
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
  }, [page, query, selectedGenreIds]);

  const handleGenreClick = (genre: GenreItem) => {
    const params = new URLSearchParams(searchParams.toString());
    const isSelected = selectedGenreIds.includes(genre.id);
    const nextIds = isSelected
      ? selectedGenreIds.filter((id) => id !== genre.id)
      : [...selectedGenreIds, genre.id];
    const nextNames = isSelected
      ? selectedGenreNames.filter((n) => n !== genre.name)
      : [...selectedGenreNames, genre.name];
    params.set("page", "1");
    if (nextIds.length > 0) {
      params.set("genreIds", nextIds.join(","));
      params.set("genreNames", nextNames.join(","));
    } else {
      params.delete("genreIds");
      params.delete("genreNames");
      params.delete("genreId");
      params.delete("genreName");
    }
    if (query) params.set("query", query);
    router.replace(`/searchFilter?${params.toString()}`);
  };

  const headingText =
    selectedGenreNames.length > 0
      ? `${totalResults} titles in "${selectedGenreNames.join(", ")}"`
      : query
        ? `Search results for "${query}"`
        : "Search results";

  return (
    <div className="min-h-screen text-black">
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-12">
        <aside className="col-span-4">
          <h2 className="text-3xl font-bold tracking-tight dark:text-white">
            Search filter
          </h2>
          <p className="pt-3.5 text-2xl font-bold tracking-tight dark:text-white">
            Genres
          </p>
          <p className="text-sm text-zinc-400 mt-1 mb-6">
            See lists of movies by genre
          </p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const isActive = selectedGenreIds.includes(genre.id);
              return (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre)}
                  className={`cursor-pointer px-3 py-1.5 border text-xs font-medium rounded-md transition ${
                    isActive
                      ? "bg-black text-white border-black dark:bg-white dark:text-black"
                      : "border-zinc-300 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-300 dark:hover:text-black"
                  }`}
                >
                  {genre.name}
                  {isActive && <span className="ml-1">✕</span>}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="col-span-8">
          <h1 className="text-3xl dark:text-white font-bold tracking-tight">
            {headingText}
          </h1>
          <p className="text-sm text-zinc-400 mt-1 mb-6">
            {selectedGenreNames.length > 0
              ? `Movies in the ${selectedGenreNames.join(", ")} genres`
              : ""}
          </p>

          {loading ? (
            <p className="text-zinc-400">Loading...</p>
          ) : movies.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
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
          ) : (
            <p className="text-zinc-400">No movies found.</p>
          )}

          <div className="w-full pt-4">
            <PaginationMovie totalPages={totalPages} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchFilter() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SearchFilterContent />
    </Suspense>
  );
}
