import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const MovieDetailInfo = ({
  movieDetail,
  director,
  writers,
  stars,
}: {
  movieDetail: any;
  director: string;
  writers: string;
  stars: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3 py-5">
        {movieDetail?.genres?.map((item: any) => (
          <Button
            key={item.id}
            className="flex gap-2 items-center h-5 font-semibold text-[12px]"
            variant={"outline"}
          >
            <span>{item.name}</span>
            <ChevronRight />
          </Button>
        ))}
      </div>
      <p>{movieDetail?.overview}</p>
      <div className="flex flex-col pt-6 gap-2">
        <p className="font-bold">
          Director: <span className="font-normal">{director || "N/A"}</span>
        </p>
        <hr />
        <p className="font-bold">
          Writers: <span className="font-normal">{writers || "N/A"}</span>
        </p>
        <hr />
        <p className="font-bold">
          Stars: <span className="font-normal">{stars || "N/A"}</span>
        </p>
        <hr />
      </div>
    </div>
  );
};