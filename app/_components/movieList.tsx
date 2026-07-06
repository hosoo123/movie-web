import { ChevronRight } from "lucide-react";
import { MovieCard } from "./movieCard";
import { title } from "process";

const movies = [
  {
    id: 1,
    title: "Movie 1",
    image: "/sMovie-01.png",
  },
];

export const MovieList = () => {
  return (
    <section className="flex flex-col gap-4 w-full px-[80px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-[24px]">Upcoming </p>
        <div className="flex flex-row">
          <p className="font-medium text-sm">See more</p>
          <ChevronRight className="w-4.5 h-4.5 " />
        </div>
      </div>
      <div className="flex gap-8 flex-wrap">
        <MovieCard />
        <MovieCard />
        <MovieCard/>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </section>
  );
};
