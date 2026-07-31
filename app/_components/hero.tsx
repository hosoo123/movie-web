"use client";

import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HeroCard } from "./heroCard";
import { useEffect, useRef, useState } from "react";

const api_key = "3f7806eb786a47af748865926b439e68";

export const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchHeroMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${api_key}`,
      );
      const data = await response.json();
      setMovies(data.results?.slice(0, 5) || []);
    };
    fetchHeroMovies();
  }, []);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full relative rounded-xl overflow-hidden">
      <Carousel setApi={setApi} plugins={[plugin.current]} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {movies.map((movie, index) => (
            <CarouselItem key={index}>
              <HeroCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex left-4 z-20 bg-black/50 text-white border-white/20 hover:bg-black/80" />
        <CarouselNext className="hidden sm:flex right-4 z-20 bg-black/50 text-white border-white/20 hover:bg-black/80" />
      </Carousel>

      <div className="flex justify-center gap-2 mt-4">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              current === index ? "bg-indigo-600 w-6" : "bg-gray-300 dark:bg-zinc-700 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};