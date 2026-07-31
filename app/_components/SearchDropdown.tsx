"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

const API_KEY = "3f7806eb786a47af748865926b439e68";

export const SearchDropdown = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  // ── Debounce + Fetch ─────────────────────────────
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchValue.trim()) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchValue.trim())}&language=en-US&page=1&api_key=${API_KEY}`,
        );
        const data = await res.json();
        setSuggestions((data.results || []).slice(0, 5));
        setIsOpen(true);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  // ── Гадна дарахад хаах ───────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Enter дарахад шилжих ─────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      setIsOpen(false);
      router.push(
        `/searchResults?query=${encodeURIComponent(searchValue.trim())}&page=1`,
      );
    }
  };

  const goToResults = () => {
    setIsOpen(false);
    router.push(
      `/searchResults?query=${encodeURIComponent(searchValue.trim())}&page=1`,
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input */}
      <div className="border rounded-lg flex flex-row items-center h-9 w-96 dark:border-white bg-white dark:bg-black z-20">
        <img
          src="/icons/searchIcon.png"
          alt="searchIcon"
          width={24}
          height={24}
          className="pl-3.5 object-contain dark:invert"
        />
        <Input
          type="text"
          placeholder="Search.."
          className="border-none outline-none h-full w-full pl-3 z-10"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchValue.trim() && setIsOpen(true)}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-11 left-0 w-96 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {loading ? (
            <div className="p-4 text-xs text-zinc-400 text-center">
              Loading...
            </div>
          ) : suggestions.length > 0 ? (
            <div className="p-2 divide-y divide-zinc-100 dark:divide-zinc-800">
              {suggestions.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movieDetails/${movie.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate text-black dark:text-white">
                      {movie.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                      <span>⭐ {movie.vote_average?.toFixed(1)} / 10</span>
                      {movie.release_date && (
                        <span>• {movie.release_date.split("-")[0]}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400">→</span>
                </Link>
              ))}
              <button
                onClick={goToResults}
                className="cursor-pointer w-full text-left pt-3 pb-1 px-2 text-xs font-semibold text-black dark:text-white hover:underline"
              >
                See all results for "{searchValue}"
              </button>
            </div>
          ) : (
            <div className="p-4 text-xs text-zinc-400 text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
