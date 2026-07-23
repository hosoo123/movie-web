import { Button } from "@/components/ui/button";

import Image from "next/image";

export const HeroCard = () => {
  return (
    <section className="w-full h-[600px] relative">
      <Image
        src="/icons/Feature.png"
        alt="featurePng"
        fill
        className="w-full h-full object-cover absolute"
      />
      <div className="relative z-10 pl-[140px] text-white w-full h-full items-center flex">
        <div className="flex flex-col">
          <div>
            <p className="text-base bold">Now Playing:</p>
            <p className="text-4xl font-extrabold">Wicked</p>
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
          </div>
          <p className="py-4 w-[302px] text-xs">
            Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads.{" "}
          </p>
          <Button className="w-[145px] bg-white text-black hover:text-white">
            <Image
              src="/icons/play.png"
              alt="playIcon"
              width={9}
              height={12}
              className="w-[9px] h-3 "
            />
            Watch Trailer
          </Button>
        </div>
      </div>
    </section>
  );
};
