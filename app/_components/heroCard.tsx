"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TrailerDialog } from "./trailerDialog";

export const HeroCard = ({ movie }: { movie: any }) => {
  return (
    <div className="w-full h-[600px] relative">
      <Link href={`/movieDetails/${movie.id}`} className="block w-full h-full">
        <section className="w-full h-full relative">
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt={movie?.title}
            className="w-full h-full cursor-pointer object-cover absolute"
          />
          <div className="relative z-10 pl-[140px] text-white w-full h-full items-center flex">
            <div className="flex flex-col">
              <div>
                <p className="text-base bold">Now Playing:</p>
                <p className="text-4xl font-extrabold">{movie?.title}</p>
                <p className="flex flex-row gap-1.5 text-lg ">
                  <Image
                    src="/icons/star.png"
                    alt="StarIcon"
                    width={23}
                    height={22}
                  />
                  {movie?.vote_average?.toFixed(1)}
                  <span className="text-[#71717A] text-base flex items-center">
                    /10
                  </span>
                </p>
              </div>
              <p className="py-4 w-[302px] text-xs">{movie?.overview}</p>
            </div>
          </div>
        </section>
      </Link>

      <TrailerDialog movieId={movie?.id} movieTitle={movie?.title}>
        <Button
          type="button"
          className="absolute bottom-40 left-[140px] z-20 w-[145px] bg-white text-black hover:text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src="/icons/play.png"
            alt="playIcon"
            width={9}
            height={12}
            className="w-[9px] h-3 "
          />
          Watch Trailer
        </Button>
      </TrailerDialog>
    </div>
  );
};
