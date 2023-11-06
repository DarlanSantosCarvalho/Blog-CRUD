"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <header>
      <nav className="flex justify-between p-12 text-xl text-black bg-gray-400">
        <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
          {" "}
          <Link href="/">Blog X</Link>
        </p>
        <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
          {" "}
          <Link href="/Posts">Posts</Link>
        </p>
        <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
          {" "}
          <Link href="/Usuarios">Usuários</Link>
        </p>
        <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
          {" "}
          <Link href="/Login">Login</Link>
        </p>
      </nav>
    </header>
  );
}