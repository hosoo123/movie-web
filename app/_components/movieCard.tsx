import Image from "next/image";

export const MovieCard = ({
  title,
  image,
  rating,
}: {
  title: string;
  image: string;
  rating: number;
}) => {
  return (
    <div className="flex flex-col w-[230px] h-[440px] rounded-xl border-black border-2 bg-gray-300">
      <Image
        src={`https://image.tmdb.org/t/p/w500${image}`}
        alt="movies"
        width={223}
        height={440}
        className="w-full h-[340px] rounded-lg"
      />
      <div className="p-2">
        {" "}
        <p className="flex flex-row gap-1.5 text-sm ">
          <Image
            src="/icons/star.png"
            alt="StarIcon"
            width={14}
            height={12}
            className="w-4 h-4"
          />
          {rating}
          <span className="text-[#71717A] text-xs flex items-center">/10</span>
        </p>
        <p className="text-lg ">{title}</p>
      </div>
    </div>
  );
};
