import { Header } from "../_components/header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Footer } from "../_components/footer";
const api_key = "3f7806eb786a47af748865926b439e68";

const data = ["Fairy Tale", "Pop Musical", "Fantasy", "Musical", "Romance"];

export default function Home() {
  return (
    <section className="flex flex-col w-full h-screen">
      <div className="w-[1440px] mx-auto flex flex-col gap-6 ">
        <Header />
        <div className="w-[1080px] mx-auto">
          <div className="flex justify-between">
            <div className="font-semibold">
              <p>Wicked</p>
              <p>2024.11.26 · PG · 2h 40m</p>
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
                  6.9
                  <span className="text-[#71717A] text-base flex items-center">
                    /10
                  </span>
                </p>
                <p className="text-[#71717A] justify-center text-xs flex items-center font-bold">
                  37k
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-8 justify-center w-full pb-8">
            <img src="/icons/Feature.png" className="w-[290px] h-[428px]" />
            <img src="/icons/Feature.png" className="w-[760px] h-[428px]" />
          </div>
          <div className="flex flex-row gap-3 mx-auto py-5">
            {data.map((item, index) => {
              return (
                <Button
                  key={index}
                  className="flex gap-2 items-center h-5 font-semibold text-[12px]"
                  variant={"outline"}
                >
                  <span>{item}</span>
                  <ChevronRight />
                </Button>
              );
            })}
            <div className="flex flex-col"><p>
              Elphaba, a misunderstood young woman because of her green skin,
              and Glinda, a popular girl, become friends at Shiz University in
              the Land of Oz. After an encounter with the Wonderful Wizard of
              Oz, their friendship reaches a crossroads.{" "}
            </p></div>
            
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}
