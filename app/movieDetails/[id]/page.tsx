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

  const fetchMovieDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${api_key}`,
    );
    const data = await response.json();
    setMovieDetail(data);
  };

  const fetchCreditDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${api_key}`,
    );
    const data = await response.json();
    setMovieCredits(data);
  };

  const fetchSimilarMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&api_key=${api_key}`,
    );
    const data = await response.json();
    setSimilarMovies(data);
  };

  const fetchTrailerVid = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${api_key}`,
    );
    const data = await response.json();
    setTrailerVideo(data);
  };
  useEffect(() => {
    fetchMovieDetail();
    fetchCreditDetail();
    fetchSimilarMovies();
    fetchTrailerVid();
  }, [id]);

  const director = movieCredits?.crew?.find(
    (person: any) => person.job === "Director",
  )?.name;
  const writers = movieCredits?.crew
    ?.filter((person: any) => person.department === "Writing")
    ?.slice(0, 3)
    ?.map((person: any) => person.name)
    ?.join(" · ");
  const stars = movieCredits?.cast
    ?.slice(0, 3)
    ?.map((person: any) => person.name)
    ?.join(" · ");

  // ── Trailer ──────────────────────────────────────
  const officialTrailer =
    trailerVideo?.results?.find(
      (video: any) => video.type === "Trailer" && video.site === "Youtube",
    ) || trailerVideo?.results?.[0];
  return (
    <section className="flex flex-col w-full h-screen">
      <div className="w-[1440px] mx-auto flex flex-col gap-6">
        <Header />
        <div className="w-[1080px] mx-auto">
          <MovieDetailHeader movieDetail={movieDetail} />
          <MovieDetailImages
            movieDetail={movieDetail}
            officialTrailer={officialTrailer}
          />
          <MovieDetailInfo
            movieDetail={movieDetail}
            director={director}
            writers={writers}
            stars={stars}
          />
        </div>
        <div className="w-[1080px] mx-auto pb-4">
          <MovieList
            genre="More Like This"
            ShowSeeMore={true}
            url={`/similar/${id}`}
            movies={similarMovies?.results ?? []}
            cols={5}
            limit={5}
            cardSize="sm"
          />
        </div>
        <Footer />
      </div>
    </section>
  );
}
