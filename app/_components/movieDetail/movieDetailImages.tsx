import { TrailerDialog } from "@/app/_components/trailerDialog";

export const MovieDetailImages = ({
  movieDetail,
  officialTrailer,
}: {
  movieDetail: any;
  officialTrailer: any;
}) => {
  return (
    <div className="flex flex-row gap-8 justify-center w-full pb-8">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`}
          className="w-[290px] h-[428px]"
        />
      </div>
      <div className="relative h-[428px]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}`}
          width={760}
          height={428}
          className="w-[760px] h-[428px]"
        />

        <TrailerDialog
          movieId={movieDetail?.id}
          movieTitle={movieDetail?.title}
          trailer={officialTrailer}
        >
          <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3 bg-black/40 hover:bg-black/60 p-2 pr-4 rounded-full backdrop-blur-sm transition cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <img
                src="/icons/vector.svg"
                alt="Play"
                className="w-4 h-4 ml-0.5"
              />
            </div>
            <div className="text-white font-bold flex gap-2">
              <p>Play trailer</p>
            </div>
          </div>
        </TrailerDialog>
      </div>
    </div>
  );
};
