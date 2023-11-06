"use client";
import NavBar from "./NavBar/page";
import Link from "next/link";

export default function Home() {
  return (
    <body>
      <NavBar />
      <div className="bg-gray-500 h-screen flex flex-col items-center justify-center">
        <div className="mb-60 text-center">
          <h1 className="text-4xl font-black text-black mb-4">
            Bem-vindo ao BlogX
          </h1>
          <p className="text-2xl text-black">
            Seja parte da nossa comunidade e compartilhe suas histórias e
            conhecimentos conosco.
          </p>
          <button className="text-xl mt-2 underline font-bold hover:text-2xl duration-300">
            <Link href="/Cadastro">Cadastre-se e compartilhe seus posts</Link>
          </button>
        </div>
      </div>
    </body>
  );
}
