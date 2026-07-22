"use client";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { PaginationMovie } from "../_components/paginationMovie";
import { useEffect, useState } from "react";

const api_key = "3f7806eb786a47af748865926b439e68";
const apiUrlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`;

export default function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);

  const fetchUpcomingMovies = async () => {
    const response = await fetch(apiUrlUpcoming);
    const data = await response.json();
    setUpcomingMovies(data.results);
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <section className="w-[1440px] mx-auto flex flex-col gap-6">
        <Header />
        <section className="flex flex-col gap-4 w-full px-[80px]">
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold text-[24px]">Upcoming </p>
          </div>
          <div className="flex gap-8 flex-wrap">
            {upcomingMovies.map((item) => (
              <MovieCard
                key={item.id}
                image={item.poster_path}
                title={item.title}
                rating={item.vote_average}
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
