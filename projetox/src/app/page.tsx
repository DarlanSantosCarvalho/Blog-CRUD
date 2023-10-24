"use client";
import NavBar from "./NavBar/page";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <body>
        <NavBar />
        <main className="text-center font-bold list-none mt-20 text-xl">
          <h1 className="m-10">
            Seja bem vindo ao nosso blog
            <br />
            Aqui é onde você pode ser você.
          </h1>
          <p>
            <li>Poste suas idéias</li>
            <li> Poste seus pensamentos</li>
            <li> Poste o que quiser</li>
          </p>

          <div className="mt-20 text-center text-orange-500">
          <Link href="/Cadastro">Cadastre-se</Link>
          </div>
        </main>
      </body>
    </main>
  );
}
