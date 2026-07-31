"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Header } from "../../_components/header";
import { Footer } from "../../_components/footer";
import { MovieList } from "../../_components/movieList";
import { PaginationMovie } from "../../_components/paginationMovie";

const api_key = "3f7806eb786a47af748865926b439e68";

function SimilarContent() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}&api_key=${api_key}`
      );
      const data = await response.json();
      setSimilarMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages, 500));
    };
    fetchSimilarMovies();
  }, [id, page]);

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
        <PaginationMovie totalPages={totalPages} />
        <Footer />
      </div>
    </div>
  );
}

export default function SimilarPage() {
  return (
    <Suspense fallback={<div />}>
      <SimilarContent />
    </Suspense>
  );
}