import Image from "next/image";

export const MovieDetailHeader = ({ movieDetail }: { movieDetail: any }) => {
  return (
    <div className="flex justify-between">
      <div className="font-semibold">
        <p>{movieDetail?.title}</p>
        <p>
          {movieDetail?.release_date} · {movieDetail?.runtime}m
        </p>
      </div>
      <div>
        <p>Rating</p>
        <div>
          <p className="flex flex-row gap-1.5 text-lg">
            <Image src="/icons/star.png" alt="StarIcon" width={23} height={22} />
            {movieDetail?.vote_average}
            <span className="text-[#71717A] text-base flex items-center">/10</span>
          </p>
          <p className="text-[#71717A] justify-center text-xs flex items-center font-bold">
            {movieDetail?.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
};