import { ChevronRight } from "lucide-react";
import { MovieCard } from "./movieCard";
import Link from "next/link";

export const MovieList = ({
  genre,
  ShowSeeMore,
  url = "#",
  movies,
  limit = 10,
  onSeeMore,
  cardSize = "md",
}: {
  genre: string;
  ShowSeeMore: boolean;
  url?: string;
  movies: any[];
  limit?: number;
  onSeeMore?: () => void;
  cols?: number;
  cardSize?: "sm" | "md";
}) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold text-xl sm:text-2xl">{genre}</h2>
        {ShowSeeMore &&
          (onSeeMore ? (
            <button
              onClick={onSeeMore}
              className="flex items-center font-medium text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>See more</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          ) : (
            <Link
              href={url}
              className="flex items-center font-medium text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>See more</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          ))}
      </div>

      {/* Grid: Responsive Columns (2 columns on mobile -> 5 on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
        {movies.slice(0, limit).map((item) => (
          <MovieCard
            key={item.id}
            image={item.poster_path}
            title={item.title}
            rating={item.vote_average}
            id={item.id}
            size={cardSize}
          />
        ))}
      </div>
    </section>
  );
};