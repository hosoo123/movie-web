import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { DarkModeToggle } from "./DarkMode";

export const Header = () => {
  return (
    <section>
      {" "}
      <header className="flex flex-row items-center justify-around w-[full] h-[59px]">
        <Link href="/">
          <div className="flex flex-row gap-2 ">
            <img
              src="/icons/Logo.png"
              alt="logoMovie"
              width={100}
              height={100}
            />
          </div>
        </Link>

        <div className="flex  flex-row gap-2.5">
          <Button className="drop-shadow-md flex gap-2 font-medium text-[14px] bg-white text-black h-9 dark:border-white dark:bg-black  dark:text-white">
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
        <DarkModeToggle />
      </header>
    </section>
  );
};
