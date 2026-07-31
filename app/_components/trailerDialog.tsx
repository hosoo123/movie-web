"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const api_key = "3f7806eb786a47af748865926b439e68";

export const TrailerDialog = ({
  movieId,
  movieTitle,
  children,
  contentClassName,
  trailer,
}: {
  movieId?: number | string;
  movieTitle?: string;
  children: React.ReactNode;
  contentClassName?: string;
  trailer?: any;
}) => {
  const [officialTrailer, setOfficialTrailer] = useState<any>(trailer ?? null);

  useEffect(() => {
    if (trailer) {
      setOfficialTrailer(trailer);
      return;
    }

    if (!movieId) return;

    const fetchTrailerVid = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${api_key}`,
      );
      const data = await response.json();
      const foundTrailer =
        data?.results?.find(
          (video: any) => video.type === "Trailer" && video.site === "Youtube",
        ) || data?.results?.[0];
      setOfficialTrailer(foundTrailer);
    };

    fetchTrailerVid();
  }, [movieId, trailer]);

  if (!officialTrailer) {
    return <>{children}</>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={
          contentClassName ??
          "!max-w-5xl w-[90vw] p-0 border-none bg-black overflow-hidden"
        }
      >
        <DialogTitle className="sr-only">
          {movieTitle ? `${movieTitle} Trailer` : "Trailer"}
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
  );
};
