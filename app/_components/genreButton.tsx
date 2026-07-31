"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";

const API_KEY = "3f7806eb786a47af748865926b439e68";

type GenreItem = {
  id: number;
  name: string;
};

export function GenreButtonDrop({ onOpen }: { onOpen?: () => void }) {
  const router = useRouter();
  const [genres, setGenres] = useState<GenreItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY}`,
        );
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Genre fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreSelect = (genre: GenreItem) => {
    const params = new URLSearchParams();
    params.set("genreId", String(genre.id));
    params.set("genreName", genre.name);
    params.set("page", "1");
    router.push(`/searchFilter?${params.toString()}`);
  };

  return (
    <DropdownMenu onOpenChange={(open) => { if (open) onOpen?.(); }}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="drop-shadow-md flex gap-2 font-medium text-[14px] bg-white text-black h-9 dark:border-white dark:bg-black  dark:text-white"
        >
          <span>
            <ChevronDown />
          </span>
          Genre
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[577px] h-[333px] p-5 " align="start">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Genres</p>
          <p>See list of movies by genre</p>
        </div>
        <DropdownMenuSeparator />
        <div className="flex gap-3 flex-wrap">
          {loading ? (
            <p className="text-sm text-zinc-400">Loading genres...</p>
          ) : genres.length > 0 ? (
            genres.map((genre) => (
              <Button
                key={genre.id}
                className="flex gap-2 items-center h-5 font-semibold text-[12px]"
                variant={"outline"}
                onClick={() => handleGenreSelect(genre)}
              >
                <span>{genre.name}</span>
                <ChevronRight />
              </Button>
            ))
          ) : (
            <p className="text-sm text-zinc-400">No genres available</p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
