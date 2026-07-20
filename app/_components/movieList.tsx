import { ChevronRight } from "lucide-react";
import { MovieCard } from "./movieCard";
import Link from "next/link";

const movies = [
  {
    id: 1,
    title: "Dear Santa",
    image: "/images/sMovie-01.png",
    rating: 8.5,
  },
  {
    id: 2,
    title: "How To Train Your Dragon Live Action",
    image: "/images/sMovie-02.png",
    rating: 8.5,
  },
  {
    id: 3,
    title: "Alien Romulus",
    image: "/images/sMovie-03.png",
    rating: 8.5,
  },
  {
    id: 4,
    title: "From the Ashes",
    image: "/images/sMovie-04.png",
    rating: 8.5,
  },
  {
    id: 5,
    title: "Space Dogg",
    image: "/images/sMovie-05.png",
    rating: 8.5,
  },
  {
    id: 6,
    title: "The Order",
    image: "/images/sMovie-06.png",
    rating: 8.5,
  },
  {
    id: 7,
    title: "Y2K",
    image: "/images/sMovie-07.png",
    rating: 8.5,
  },
  {
    id: 8,
    title: "Solo Leveling: ReAwakening",
    image: "/images/sMovie-08.png",
    rating: 8.5,
  },
  {
    id: 9,
    title: "Get Away",
    image: "/images/sMovie-09.png",
    rating: 8.5,
  },
  {
    id: 10,
    title: "Sonic the Hedgehog 3",
    image: "/images/sMovie-10.png",
    rating: 8.5,
  },
];

export const MovieList = ({ genre }: { genre: string }) => {
  return (
    <section className="flex flex-col gap-4 w-full px-[80px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-[24px]">{genre} </p>
        <div className="flex flex-row">
          <Link href="/popular" className="font-medium text-sm">
            See more
          </Link>
          <ChevronRight className="w-4.5 h-4.5 " />
        </div>
      </div>
      <div className="flex gap-8 flex-wrap">
        {movies.map((item) => (
          <MovieCard
            key={item.id}
            image={item.image}
            title={item.title}
            rating={item.rating}
          />
        ))}
      </div>
    </section>
  );
};
