"use client";
import { Header } from "../../_components/header";
import { Footer } from "../../_components/footer";
import { MovieList } from "../../_components/movieList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaginationMovie } from "@/app/_components/paginationMovie";

const api_key = "3f7806eb786a47af748865926b439e68";

export default function SimilarPage() {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);

  const fetchSimilarMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&api_key=${api_key}`,
    );
    const data = await response.json();
    setSimilarMovies(data.results);
  };

  useEffect(() => {
    fetchSimilarMovies();
  }, [id]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-[1440px] mx-auto flex flex-col gap-6">
        <Header />
        <div className="px-[80px]">
          <MovieList
            genre="More Like This"
            ShowSeeMore={false}
            movies={similarMovies}
            cols={5}
            limit={20}
            cardSize="md"
          />
        </div>
        <PaginationMovie />
        <Footer />
      </div>
    </div>
  );
}
