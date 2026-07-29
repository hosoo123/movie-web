// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { HeroCard } from "./heroCard";
// export const Hero = () => {
//   return (
//     <Carousel className="w-full h-full">
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <HeroCard />
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// };
"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HeroCard } from "./heroCard";

export const Hero = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // ✅ Autoplay plugin — 3 секунд тутам баруунаас зүүнлүү шилжинэ
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  // ✅ Одоогийн slide-г хянана
  React.useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full relative">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true }}  // ✅ Эцэст хүрэхэд эхнээс давтана
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <HeroCard />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* ✅ Dot indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === index ? "bg-black w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};