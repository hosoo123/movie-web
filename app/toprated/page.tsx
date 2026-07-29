"use client";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { PaginationMovie } from "../_components/paginationMovie";
import { useEffect, useState } from "react";

const api_key = "3f7806eb786a47af748865926b439e68";

export default function TopRatedPage() {
  const [topMovies, setTopMovies] = useState<any[]>([]);

  const fetchTopMovies = async () => {
    const apiUrlTopRated = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${api_key}`;
    const response = await fetch(apiUrlTopRated);
    const data = await response.json();
    setTopMovies(data.results || []);
  };

  useEffect(() => {
    fetchTopMovies();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <section className="w-[1440px] mx-auto flex flex-col gap-6">
        <Header />
        <section className="flex flex-col gap-4 w-full px-[80px]">
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold text-[24px]">Top Rated</p>
          </div>
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: `repeat(5, minmax(0, 1fr))` }}
          >
            {topMovies.map((item) => (
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