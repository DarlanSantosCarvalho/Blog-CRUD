"use client";
import NavBar from "./NavBar/page";
import Link from "next/link";

export default function Home() {
  return (
    <body>
      <NavBar />
      <main className="text-center font-bold list-none mt-20 text-xl">
        <div className="text-sm flex flex-col justify-around w-1/2 h-48 m-auto text-center p-5 bg-gray-200 text-black md:w-1/4 md:text-xl">
          <Link href="/Cadastro">
            <h1 className="underline hover:text-2xl duration-300">No que você está pensando agora?</h1>
          </Link>
            <p>Não perca tempo, poste para todos verem!</p>
        </div>
      </main>
    </body>
  );
}
