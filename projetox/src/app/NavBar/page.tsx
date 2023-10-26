"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <header>
      <nav className="flex justify-between p-12 text-xl text-black bg-gray-300">
        <p className="hover:text-2xl duration-300"> <Link href="/">Blog X</Link></p>
        <p className="hover:text-2xl duration-300"> <Link href="/Posts">Posts</Link></p>
        <p className="hover:text-2xl duration-300"> <Link href="/Usuarios">Usuários</Link></p>
      </nav>
    </header>
  );
}
