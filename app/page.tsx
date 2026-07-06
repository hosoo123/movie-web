import Image from "next/image";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { MovieList } from "./_components/movieList";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen">
      <main className="w-[1440px] mx-auto flex flex-col gap-6">
        <Header />
        <div className="flex flex-col gap-13">
          <Hero />
          <MovieList />
          <Footer />
        </div>
      </main>
    </div>
  );
}
