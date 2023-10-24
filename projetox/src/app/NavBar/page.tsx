"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <header>
      <nav className="flex justify-between p-12 text-xl text-orange-500 bg-black">
        <p> <Link href="/">Blog X</Link></p>
        <p> <Link href="/Posts">Posts</Link></p>
        <p> <Link href="/users">Usuários</Link></p>
      </nav>
    </header>
  );
}
