import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

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

        {officialTrailer && (
          <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>

            <DialogContent className="!max-w-5xl w-[90vw] p-0 border-none bg-black overflow-hidden">
              <DialogTitle className="sr-only">
                {movieDetail?.title} Trailer
              </DialogTitle>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${officialTrailer.key}?autoplay=1`}
                  title="YouTube trailer player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
