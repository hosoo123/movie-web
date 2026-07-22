import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <section>
      {" "}
      <header className="flex flex-row items-center justify-around w-[full] h-[59px]">
        <Link href="#">
          <div className="flex flex-row gap-2 ">
            <img
              src="/icons/Logo.png"
              alt="logoMovie"
              width={100}
              height={100}
            />
          </div>
        </Link>

        <div className="flex flex-row gap-2.5">
          <Button className="drop-shadow-md flex gap-2 font-medium text-[14px] bg-white text-black h-9">
            <img src="/icons/down.svg" alt="down" />
            Genre
          </Button>
          <div className="border rounded-lg flex flex-row h-9 w-[379px]">
            <img
              src="/icons/searchIcon.png"
              alt="searchIcon"
              width={24}
              height={24}
              className="pl-3.5 object-contain absolute top-6"
            />
            <Input
              type="text"
              placeholder="Search.."
              className="border-none outline-hidden h-full w-full pl-10 z-10"
            />
          </div>
        </div>
        <div className="rounded-md w-9 h-9 bg-white flex items-center justify-center drop-shadow-lg">
          <Image
            src="/icons/Vector6.png"
            alt="darkModeIcon"
            width={16}
            height={16}
          />
        </div>
      </header>
    </section>
  );
};
