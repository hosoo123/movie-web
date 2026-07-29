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
  cols = 5,
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
        <p className="font-semibold text-[24px]">{genre}</p>
        {ShowSeeMore &&
          (onSeeMore ? (
            <button
              onClick={onSeeMore}
              className="flex flex-row items-center font-medium text-sm hover:underline"
            >
              <span>See more</span>
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          ) : (
            <Link
              href={url}
              className="flex flex-row items-center font-medium text-sm hover:underline"
            >
              <span>See more</span>
              <ChevronRight className="w-4.5 h-4.5" />
            </Link>
          ))}
      </div>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
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
