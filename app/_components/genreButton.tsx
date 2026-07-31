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

export function GenreButtonDrop({
  onOpen,
  isIconOnly = false,
}: {
  onOpen?: () => void;
  isIconOnly?: boolean;
}) {
  const router = useRouter();
  const [genres, setGenres] = useState<GenreItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY}`
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
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) onOpen?.();
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 font-medium text-xs sm:text-sm h-9 bg-white text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white px-3"
        >
          <ChevronDown className="w-4 h-4" />
          {!isIconOnly && <span>Genre</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[90vw] max-w-[500px] p-4 max-h-[80vh] overflow-y-auto z-[60]"
        align="start"
      >
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-lg font-bold">Genres</p>
          <p className="text-xs text-zinc-500">See list of movies by genre</p>
        </div>
        <DropdownMenuSeparator />
        <div className="flex gap-2 flex-wrap pt-2">
          {loading ? (
            <p className="text-sm text-zinc-400">Loading genres...</p>
          ) : genres.length > 0 ? (
            genres.map((genre) => (
              <Button
                key={genre.id}
                size="sm"
                variant="outline"
                className="flex gap-1 items-center text-xs font-medium h-7"
                onClick={() => handleGenreSelect(genre)}
              >
                <span>{genre.name}</span>
                <ChevronRight className="w-3 h-3" />
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