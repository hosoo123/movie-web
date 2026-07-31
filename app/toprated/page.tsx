"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { PaginationMovie } from "../_components/paginationMovie";

const api_key = "3f7806eb786a47af748865926b439e68";

function TopRatedContent() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const [topMovies, setTopMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&api_key=${api_key}`
      );
      const data = await response.json();
      setTopMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages, 500));
    };
    fetchTopMovies();
  }, [page]);

  return (
    <div className="flex flex-col w-full">
      <section className="w-[1440px] mx-auto flex flex-col gap-6">
        <Header />
        <section className="flex flex-col gap-4 w-full px-[80px]">
          <p className="font-semibold text-[24px]">Top Rated</p>
          <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(5, minmax(0, 1fr))` }}>
            {topMovies.map((item) => (
              <MovieCard key={item.id} image={item.poster_path} title={item.title} rating={item.vote_average} id={item.id} />
            ))}
          </div>
        </section>
        <PaginationMovie totalPages={totalPages} />
        <Footer />
      </section>
    </div>
  );
}

export default function TopRatedPage() {
  return (
    <Suspense fallback={<div />}>
      <TopRatedContent />
    </Suspense>
  );
}