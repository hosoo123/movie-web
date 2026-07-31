"use client";

import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { MovieList } from "./_components/movieList";
import { Footer } from "./_components/footer";
import { useEffect, useState } from "react";

const api_key = "3f7806eb786a47af748865926b439e68";

const apiUrlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`;
const apiUrlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
const apiUrlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`;

export default function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [upcomingRes, popularRes, topRatedRes] = await Promise.all([
          fetch(apiUrlUpcoming),
          fetch(apiUrlPopular),
          fetch(apiUrlTopRated)
        ]);

        const upcomingData = await upcomingRes.json();
        const popularData = await popularRes.json();
        const topRatedData = await topRatedRes.json();

        setUpcomingMovies(upcomingData.results || []);
        setPopularMovies(popularData.results || []);
        setTopRatedMovies(topRatedData.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8 md:gap-12">
        <Hero />
        <MovieList genre="Upcoming" ShowSeeMore={true} url="/upcoming" movies={upcomingMovies} />
        <MovieList genre="Popular" ShowSeeMore={true} url="/popular" movies={popularMovies} />
        <MovieList genre="Top Rated" ShowSeeMore={true} url="/toprated" movies={topRatedMovies} />
      </main>
      <Footer />
    </div>
  );
}