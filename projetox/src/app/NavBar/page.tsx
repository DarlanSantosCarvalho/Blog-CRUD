"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function NavBar() {
  const [auth, setAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>("");

  const logOff = () => {
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
        ) : (
          <nav className="flex justify-between p-12 text-xl text-black bg-gray-400">
            <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
              {" "}
              {username}
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
