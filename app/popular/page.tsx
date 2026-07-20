import { Header } from "../_components/header";
import { MovieList } from "../_components/movieList";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen">
      <section className="w-[1440px] mx-auto flex flex-col gap-6">
        <Header />
        <MovieList genre="Upcoming"/>
      </section>
    </div>
  );
}
