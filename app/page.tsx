import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header>
        <div className="flex flex-row gap-2">
          <img src="/icons/Vector.svg" alt="vectorIcon" />
          <p className="text-indigo-700 font-bold text-base">Movie Z</p>
        </div>
        <div>
          <button></button>
          <input type="text" />
        </div>
        <div></div>
      </header>
      <main></main>
    </div>
  );
}
