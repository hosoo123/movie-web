"use client";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { PaginationMovie } from "../_components/paginationMovie";
import { useEffect, useState } from "react";

const api_key = "3f7806eb786a47af748865926b439e68";
const apiUrlPopular = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${api_key}`;

export default function PopularPage() {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);

  const fetchPopularMovies = async () => {
    const response = await fetch(apiUrlPopular);
    const data = await response.json();
    setPopularMovies(data.results);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <section className="w-[1440px] mx-auto flex flex-col gap-6">
        <Header />
        <section className="flex flex-col gap-4 w-full px-[80px]">
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold text-[24px]">Popular</p>
          </div>
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: `repeat(5, minmax(0, 1fr))` }}
          >
            {popularMovies.map((item) => (
              <MovieCard
                key={item.id}
                image={item.poster_path}
                title={item.title}
                rating={item.vote_average}
                id={item.id}
              />
            ))}
          </div>
        </section>
        <div className="w-full">
          <PaginationMovie />
        </div>
        <Footer />
      </section>
    </div>
  );
}