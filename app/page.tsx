"use client";
import Image from "next/image";
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

  const fetchUpcomingMovies = async () => {
    const response = await fetch(apiUrlUpcoming);
    const data = await response.json();
    setUpcomingMovies(data.results);
  };
  const fetchPopularMovies = async () => {
    const response = await fetch(apiUrlPopular);
    const data = await response.json();
    setPopularMovies(data.results);
  };
  const fetchTopRatedMovies = async () => {
    const response = await fetch(apiUrlTopRated);
    const data = await response.json();
    setTopRatedMovies(data.results);
  };

  useEffect(() => {
    fetchUpcomingMovies();
    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);
  console.log("upcoming", upcomingMovies);

  return (
    <div className="flex flex-col w-full h-screen">
      <main className="w-[1440px] mx-auto flex flex-col gap-6">
        <Header />
        <div className="flex flex-col gap-13">
          <Hero />
          <MovieList
            genre="Upcoming"
            ShowSeeMore={true}
            url={"/upcoming"}
            movies={upcomingMovies}
          />
          <MovieList
            genre="Popular"
            ShowSeeMore={true}
            url={"/popular"}
            movies={popularMovies}
          />
          <MovieList
            genre="Top Rated"
            ShowSeeMore={true}
            url={"/toprated"}
            movies={topRatedMovies}
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}
