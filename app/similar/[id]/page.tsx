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
    if (!id) return;

    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}&api_key=${api_key}`
        );
        const data = await response.json();
        setSimilarMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };
    fetchSimilarMovies();
  }, [id, page]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-8">
        <div>
          <MovieList
            genre="More Like This"
            ShowSeeMore={false}
            movies={similarMovies}
            cols={5}
            limit={20}
            cardSize="md"
          />
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="w-full pt-4 flex justify-center">
            <PaginationMovie totalPages={totalPages} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function SimilarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
      <SimilarContent />
    </Suspense>
  );
}