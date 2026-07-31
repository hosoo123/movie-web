"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TrailerDialog } from "./trailerDialog";

export const HeroCard = ({ movie }: { movie: any }) => {
  return (
    <div className="w-full h-[380px] sm:h-[480px] md:h-[550px] relative rounded-2xl overflow-hidden group">
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie?.title}
        className="w-full h-full object-cover absolute inset-0"
      />
      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Movie Details */}
      <div className="relative z-20 h-full max-w-2xl px-6 sm:px-12 flex flex-col justify-end pb-8 sm:pb-12 text-white">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-400">
          Now Playing
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold line-clamp-1 mt-1">
          {movie?.title}
        </h2>

        <div className="flex items-center  gap-2 mt-2">
          <Image
            src="/icons/star.png"
            alt="StarIcon"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span className="text-base sm:text-lg font-bold">
            {movie?.vote_average?.toFixed(1)}
          </span>
          <span className="text-zinc-400 text-xs sm:text-sm">/10</span>
        </div>

        <p className="py-3 text-xs sm:text-sm text-zinc-300 line-clamp-2 sm:line-clamp-3">
          {movie?.overview}
        </p>

        <div className="flex items-center cursor-pointer gap-3 mt-2">
          <Link href={`/movieDetails/${movie?.id}`}>
            <Button size="sm" className="sm:size-default cursor-pointer">
              More Info
            </Button>
          </Link>
          <TrailerDialog movieId={movie?.id} movieTitle={movie?.title}>
            <Button
              size="sm"
              variant="secondary"
              className="gap-2 bg-white/90 hover:bg-white cursor-pointer text-black sm:size-default"
            >
              <Image
                src="/icons/play.png"
                alt="play"
                width={10}
                height={12}
                className="w-2.5 h-3 cursor-pointer"
              />
              Watch Trailer
            </Button>
          </TrailerDialog>
        </div>
      </div>
    </div>
  );
};
