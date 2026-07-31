"use client";

import { Header } from "../../_components/header";
import { Footer } from "../../_components/footer";
import { MovieList } from "../../_components/movieList";
import { MovieDetailHeader } from "../../_components/movieDetail/movieDetailHeader";
import { MovieDetailImages } from "../../_components/movieDetail/movieDetailImages";
import { MovieDetailInfo } from "../../_components/movieDetail/movieDetailInfo";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const api_key = "3f7806eb786a47af748865926b439e68";

export default function MovieDetailPage() {
  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState<any>();
  const [movieCredits, setMovieCredits] = useState<any>(null);
  const [similarMovies, setSimilarMovies] = useState<any>(null);
  const [trailerVideo, setTrailerVideo] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAllData = async () => {
      try {
        const [detailRes, creditRes, similarRes, videoRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${api_key}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${api_key}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&api_key=${api_key}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${api_key}`)
        ]);

        setMovieDetail(await detailRes.json());
        setMovieCredits(await creditRes.json());
        setSimilarMovies(await similarRes.json());
        setTrailerVideo(await videoRes.json());
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllData();
  }, [id]);

  const director = movieCredits?.crew?.find((person: any) => person.job === "Director")?.name;
  const writers = movieCredits?.crew
    ?.filter((person: any) => person.department === "Writing")
    ?.slice(0, 3)
    ?.map((person: any) => person.name)
    ?.join(" · ");
  const stars = movieCredits?.cast
    ?.slice(0, 3)
    ?.map((person: any) => person.name)
    ?.join(" · ");

  const officialTrailer =
    trailerVideo?.results?.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube",
    ) || trailerVideo?.results?.[0];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8">
        <MovieDetailHeader movieDetail={movieDetail} />
        <MovieDetailImages movieDetail={movieDetail} officialTrailer={officialTrailer} />
        <MovieDetailInfo
          movieDetail={movieDetail}
          director={director}
          writers={writers}
          stars={stars}
        />
        <div className="pt-6">
          <MovieList
            genre="More like this"
            ShowSeeMore={true}
            url={`/similar/${id}`}
            movies={similarMovies?.results ?? []}
            limit={5}
            cardSize="sm"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}