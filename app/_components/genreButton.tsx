"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
const data = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-show",
  "Thriller",
  "War",
  "Western",
];
export function GenreButtonDrop() {
  return (
    <DropdownMenu>
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
          {data.map((item, index) => {
            return (
              <Button
                key={index}
                className="flex gap-2 items-center h-5 font-semibold text-[12px]"
                variant={"outline"}
              >
                <span>{item}</span>
                <ChevronRight />
              </Button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
