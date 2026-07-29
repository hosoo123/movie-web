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
      <div className="flex flex-col w-full h-full rounded-xl border-black dark:border-white border-2 bg-gray-300">
        <Image
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt="movies"
          width={223}
          height={440}
          className={`w-full rounded-lg ${size === "sm" ? "h-72" : "h-85"}`}
        />
        <div className="p-2">
          <p className="flex flex-row gap-1.5 text-sm font-bold dark:text-purple-500">
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
          <p className={`${size === "sm" ? "text-sm" : "text-lg"}`}>{title}</p>
        </div>
      </div>
    </Link>
  );
};
