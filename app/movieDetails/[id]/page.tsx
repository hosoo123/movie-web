"use client";
import { Header } from "../../_components/header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Footer } from "../../_components/footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const api_key = "3f7806eb786a47af748865926b439e68";

const data = ["Fairy Tale", "Pop Musical", "Fantasy", "Musical", "Romance"];

export default function Home() {
  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState<any>();
const [movieCredits, setMovieCredits] = useState<any>(null);

  const fetchMovieDetail = async () => {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${api_key}`;
    const response = await fetch(movieDetailsUrl);
    const data = await response.json();
    console.log(data);
    setMovieDetail(data);
  };
  const fetchCreditDetail = async () => {
    const creditDetailUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${api_key}`;
    const response = await fetch(creditDetailUrl);
    const data = await response.json();
    console.log("credit", data);
    setMovieCredits(data);
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchCreditDetail();
  }, [id]);

  return (
    <section className="flex flex-col w-full h-screen">
      <div className="w-[1440px] mx-auto flex flex-col gap-6 ">
        <Header />
        <div className="w-[1080px] mx-auto">
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
                <p className="flex flex-row gap-1.5 text-lg ">
                  <Image
                    src="/icons/star.png"
                    alt="StarIcon"
                    width={23}
                    height={22}
                  />
                  {movieDetail?.vote_average}
                  <span className="text-[#71717A] text-base flex items-center">
                    /10
                  </span>
                </p>
                <p className="text-[#71717A] justify-center text-xs flex items-center font-bold">
                  {movieDetail?.vote_count}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-8 justify-center w-full pb-8">
            <div>
              {" "}
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
              <div className=" absolute inset-0 z-20 ml-5 sm:mt-90 mt-45 flex gap-3">
                {" "}
                <div className="border-gray-200 flex-row flex cursor-pointer rounded-full absolute w-10 h-10 bg-white flex items-center justify-center">
                  <img src="/icons/vector.svg" alt="" className="absolute " />
                </div>
                <div className="text-white ml-15 gap-2 font-bold flex mt-2">
                  <p>Play trailer </p>
                  <p>2:35</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-3 py-5">
              {movieDetail?.genres?.map((item, index) => {
                return (
                  <Button
                    key={item.id}
                    className="flex gap-2 items-center h-5 font-semibold text-[12px]"
                    variant={"outline"}
                  >
                    <span>{item.name}</span>
                    <ChevronRight />
                  </Button>
                );
              })}
            </div>
            <div className="flex flex-col">
              <p>{movieDetail?.overview}</p>
            </div>
          </div>
          <div className="flex flex-col pt-1.5">
            <p className="font-bold">
              Director <span className="font-normal">Jon M. Chu</span>
            </p>
            <hr />
            <p className="font-bold">
              Writers{" "}
              <span className="font-normal">
                Winnie Holzman · Dana Fox · Gregory Maguire
              </span>
            </p>
            <hr />
            <p className="font-bold">
              Stars{" "}
              <span className="font-normal">
                Cynthia Erivo · Ariana Grande · Jeff Goldblum
              </span>
            </p>
            <hr />
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}
