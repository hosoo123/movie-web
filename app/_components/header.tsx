"use client";

import Link from "next/link";
import { DarkModeToggle } from "./DarkMode";
import { GenreButtonDrop } from "./genreButton";
import { SearchDropdown } from "./SearchDropdown";
import { useState } from "react";
import { Search, X } from "lucide-react";

export const Header = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur transition-colors">
      <div className="relative flex items-center justify-between max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 z-10">
          <img
            src="/icons/Logo.png"
            alt="Movie Z Logo"
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* 1. Desktop & Laptop View (Голд нь цэвэрхэн байрлуулна) */}
        <div className="hidden sm:flex items-center justify-center gap-3 flex-1 max-w-md mx-auto">
          {/* Genre нээгдэхэд Search-ийг хаана */}
          <GenreButtonDrop onOpen={() => setIsSearchOpen(false)} />

          <div className="flex-1 w-full">
            <SearchDropdown
              isOpen={isSearchOpen}
              onOpenChange={setIsSearchOpen}
            />
          </div>
        </div>

        {/* 2. Баруун талд: DarkModeToggle */}
        <div className="flex items-center gap-2 shrink-0 z-10">
          {!mobileSearchOpen && (
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Open Search"
              className="flex sm:hidden justify-center items-center h-9 w-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <DarkModeToggle />
        </div>

        {/* 3. Mobile Search Fullscreen Overlay */}
        {mobileSearchOpen && (
          <div className="sm:hidden fixed inset-0 bg-white dark:bg-zinc-950 px-4 flex items-center gap-2 z-50 animate-in fade-in duration-150">
            <GenreButtonDrop
              isIconOnly={true}
              onOpen={() => setIsSearchOpen(false)}
            />

            <div className="flex-1">
              <SearchDropdown
                autoFocus={true}
                isOpen={isSearchOpen}
                onOpenChange={setIsSearchOpen}
                onClose={() => setMobileSearchOpen(false)}
              />
            </div>

            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Close Search"
              className="flex justify-center items-center h-9 w-9 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};