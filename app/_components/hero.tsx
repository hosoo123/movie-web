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
  const fetchHeroMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${api_key}`,
    );
    const data = await response.json();
    setMovies(data.results.slice(0, 5));
    console.log("data", data.results);
  };

  useEffect(() => {
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
    <div className="w-full relative">
      <div className="relative">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {movies.map((movie, index) => (
              <CarouselItem key={index}>
                <HeroCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 z-20 bg-black/70 text-white border-white/20 hover:bg-black/90" />
          <CarouselNext className="right-4 z-20 bg-black/70 text-white border-white/20 hover:bg-black/90" />
        </Carousel>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === index ? "bg-black w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
