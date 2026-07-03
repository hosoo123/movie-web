import Image from "next/image";

export const MovieCard = () => {
  return (
    <div className="flex flex-col w-[230px] h-[440px] rounded-lg bg-gray-300">
      <Image
        src="/images/sMovie-01.png"
        alt="movie1"
        width={223}
        height={440}
        className="w-full h-[340px]"
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
          6.9
          <span className="text-[#71717A] text-xs flex items-center">/10</span>
        </p>
        <p className="text-lg ">Dear Santa</p>
      </div>
    </div>
  );
};
