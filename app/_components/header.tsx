"use client";

import Link from "next/link";
import { DarkModeToggle } from "./DarkMode";
import { GenreButtonDrop } from "./genreButton";
import { SearchDropdown } from "./SearchDropdown";
import { useState } from "react";
import { Search } from "lucide-react";
export const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <section>
      <header className="flex flex-row items-center justify-between sm:justify-around w-full h-[59px] relative px-4 sm:px-6">
        {/* Лого */}
        <Link href="/">
          <img src="/icons/Logo.png" alt="logoMovie" width={100} height={100} />
        </Link>

        {/* Genre + Search */}
        <div className="flex flex-row gap-2.5 max-sm:hidden">
          <GenreButtonDrop onOpen={() => setSearchOpen(false)} />
          <SearchDropdown isOpen={searchOpen} setIsOpen={setSearchOpen} />
        </div>
        <div className="flex gap-2.5">
          <div className="justify-center items-center flex border rounded-lg sm:hidden h-9 w-9 border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800">
            <Search className="" />
          </div>
        {/* Dark mode */}
        <DarkModeToggle />
        </div>
      </header>
    </section>
  );
};
