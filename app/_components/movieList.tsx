import { ChevronRight } from "lucide-react";
import { MovieCard } from "./movieCard";
import Link from "next/link";

export const MovieList = ({
  genre,
  ShowSeeMore,
  url = "#",
  movies,
}: {
  genre: string;
  ShowSeeMore: boolean;
  url?: string;
  movies: any[];
}) => {
  return (
    <section className="flex flex-col gap-4 w-full px-[80px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-[24px]">{genre} </p>
        {ShowSeeMore && (
          <Link
            href={url}
            className="flex flex-row items-center font-medium text-sm hover:underline"
          >
            <span>See more</span>
            <ChevronRight className="w-4.5 h-4.5" />
          </Link>
        )}
      </div>
      <div className="flex gap-8 flex-wrap">
        {movies.slice(0, 10).map((item) => (
          <MovieCard
            key={item.id}
            image={item.poster_path}
            title={item.title}
            rating={item.vote_average}
          />
        ))}
      </div>
    </section>
  );
};
