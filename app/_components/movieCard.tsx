import Image from "next/image";
import Link from "next/link";

export const MovieCard = ({
  title,
  image,
  rating,
  id,
  size = "md",
}: {
  id: string | number;
  title: string;
  image: string;
  rating: number;
  size?: "sm" | "md";
}) => {
  return (
    <Link href={`/movieDetails/${id}`} className="block h-full group">
      <div className="flex flex-col h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md">
        <div className={`relative w-full ${size === "sm" ? "h-48 sm:h-56" : "h-56 sm:h-72"} bg-zinc-200 dark:bg-zinc-800`}>
          {image ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${image}`}
              alt={title || "Movie Poster"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500">No Image</div>
          )}
        </div>
        <div className="p-3 flex flex-col justify-between flex-1">
          <p className="flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-500">
            <Image src="/icons/star.png" alt="StarIcon" width={14} height={14} className="w-3.5 h-3.5" />
            {rating ? rating.toFixed(1) : "0.0"}
            <span className="text-zinc-400 text-xs font-normal">/10</span>
          </p>
          <p className="text-xs sm:text-sm font-medium mt-1 line-clamp-2 text-zinc-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};