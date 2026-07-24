"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";

export function DropdownMenuDemo() {
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
      <DropdownMenuContent className="w-[577px] h-[333px]" align="start">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Genres</p>
          <p>See lits of movies by genre</p>
        </div>
        <DropdownMenuSeparator />
        <div className="flex gap-3 flex-wrap">
          <Button className="flex gap-2 items-center" variant={"outline"}>
            <span>Action</span>
            <ChevronRight />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
