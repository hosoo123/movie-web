"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { PaginationMovie } from "../_components/paginationMovie";

const api_key = "3f7806eb786a47af748865926b439e68";

function UpcomingContent() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}&api_key=${api_key}`
      );
      const data = await response.json();
      setUpcomingMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 500));
    };
    fetchUpcomingMovies();
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <h1 className="font-semibold text-xl sm:text-2xl">Upcoming</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {upcomingMovies.map((item) => (
            <MovieCard
              key={item.id}
              image={item.poster_path}
              title={item.title}
              rating={item.vote_average}
              id={item.id}
            />
          ))}
        </div>
        <div className="mt-auto pt-6">
          <PaginationMovie totalPages={totalPages} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function UpcomingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <UpcomingContent />
    </Suspense>
  );
}