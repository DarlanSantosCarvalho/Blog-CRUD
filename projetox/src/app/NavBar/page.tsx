"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function NavBar() {
  const [auth, setAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>("");

  function deleteCookie(name: any) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

  const logOff = () => {
    deleteCookie('token');
    setAuth(false);
    window.alert("Você se desconectou");
  };
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:8080").then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setUsername(res.data.username);
        console.log(username);
      } else {
        setAuth(false);
      }
    });
  }, []);

  return (
    <header>
      <div>
        {!auth ? (
          <nav className="flex flex-col lg:justify-between lg:flex-row p-12 text-xl text-red-700 bg-white">
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
        ) : (
          <nav className="flex flex-col text-center gap-5 lg:justify-between lg:flex-row p-12 text-xl text-red-500 bg-white">
            <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
              {" "}
              {username}
            </p>
            <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
              <Link href="/">Postar</Link>
            </p>
            <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
              {" "}
              <Link href="/Posts">Posts</Link>
            </p>
            <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
              {" "}
              <Link href="/Usuarios">Usuários</Link>
            </p>
            <p
              onClick={logOff}
              className="font-bold text-md hover:text-2xl duration-300 md:text-xl"
            >
              {" "}
              <Link href="/Login">Logoff</Link>
            </p>
          </nav>
        )}
      </div>
    </header>
  );
}
