import Image from "next/image";
import Link from "next/link";

export const MovieCard = ({
  title,
  image,
  rating,
  id,
  size = "md",
}: {
  id: string;
  title: string;
  image: string;
  rating: number;
  size?: "sm" | "md";
}) => {
  return (
    <Link href={`/movieDetails/${id}`}>
      <div className="flex flex-col w-full h-full rounded-xl border border-zinc-300 bg-gray-400 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
        <Image
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt="movies"
          width={223}
          height={440}
          className={`w-full rounded-t-xl object-cover ${size === "sm" ? "h-64" : "h-72"}`}
        />
        <div className="p-2.5 ">
          <p className="flex flex-row gap-1.5 text-sm font-bold text-amber-500">
            <Image
              src="/icons/star.png"
              alt="StarIcon"
              width={14}
              height={12}
              className="w-4 h-4"
            />
            {rating ? rating.toFixed(1) : "0.0"}
            <span className="text-[#71717A] text-xs flex items-center font-bold">
              /10
            </span>
          </p>
          <p
            className={`${size === "sm" ? "text-sm" : "text-base"} mt-1 line-clamp-2 text-zinc-800 dark:text-zinc-100`}
          >
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};
  