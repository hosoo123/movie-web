"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export const SearchDropdown = ({
  autoFocus = false,
  onClose,
  isOpen: externalIsOpen,
  onOpenChange,
}: {
  autoFocus?: boolean;
  onClose?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const setIsOpen = (open: boolean) => {
    setInternalIsOpen(open);
    if (onOpenChange) onOpenChange(open);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Гадна талд дарахад Dropdown-ийг хаах
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // TMDB API-аас кино хайх
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=3f7806eb786a47af748865926b439e68&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data.results?.slice(0, 5) || []);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Хайлтын хуудас руу шилжих ажиллагаа
  const handleSeeAll = () => {
    if (!query.trim()) return;
    setIsOpen(false);
    if (onClose) onClose();
    router.push(`/searchResults?value=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3 w-4 h-4 text-zinc-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSeeAll();
          }}
          placeholder="Search..."
          className="w-full h-9 pl-9 pr-4 text-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-lg outline-none focus:ring-1 focus:ring-zinc-400 transition-colors"
        />
      </div>

      {/* Dropdown Results */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden">
          {results.length > 0 ? (
            <>
              {results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => {
                    router.push(`/movieDetails/${movie.id}`);
                    setIsOpen(false);
                    if (onClose) onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors border-b border-zinc-100 dark:border-zinc-800"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={movie.title}
                    className="w-8 h-11 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {movie.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      ★ {movie.vote_average?.toFixed(1) || "N/A"} • {movie.release_date?.split("-")[0] || "N/A"}
                    </p>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleSeeAll}
                className="w-full p-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between cursor-pointer"
              >
                <span>
                  See all results for <strong className="text-zinc-900 dark:text-zinc-100">"{query}"</strong>
                </span>
                <span className="text-zinc-400">→</span>
              </button>
            </>
          ) : (
            <div className="p-4 text-xs text-center text-zinc-500">
              No movies found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};