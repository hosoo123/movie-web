import { TrailerDialog } from "@/app/_components/trailerDialog";

export const MovieDetailImages = ({
  movieDetail,
  officialTrailer,
}: {
  movieDetail: any;
  officialTrailer: any;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
      {/* Poster */}
      <div className="hidden md:block md:col-span-1 rounded-xl overflow-hidden bg-zinc-800">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`}
          alt={movieDetail?.title}
          className="w-full h-full object-cover max-h-[450px]"
        />
      </div>

      {/* Backdrop + Trailer */}
      <div className="relative md:col-span-2 rounded-xl overflow-hidden h-[250px] sm:h-[350px] md:h-[450px] bg-zinc-800">
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path}`}
          alt="Backdrop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <TrailerDialog
          movieId={movieDetail?.id}
          movieTitle={movieDetail?.title}
          trailer={officialTrailer}
        >
          <button className="absolute bottom-4 cursor-pointer left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-3 bg-black/50 hover:bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm transition text-white">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
              <img src="/icons/vector.svg" alt="Play" className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
            </div>
            <span className="font-semibold text-xs sm:text-sm">Play trailer</span>
          </button>
        </TrailerDialog>
      </div>
    </div>
  );
};