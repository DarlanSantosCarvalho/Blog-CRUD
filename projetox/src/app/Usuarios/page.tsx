"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/page";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";

export default function usersPage() {
  const [apiData, setApiData] = useState<any>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/users").then((res) => {
      setApiData(res.data);
    });
  }, []);

  return (
    <body>
      <NavBar />
      <main className="flex text-center justify-around gap-10 my-20 items-center flex-col">
        {apiData.map((users: any) => (
          <div
            key={users.idUsuario}
            className="w-2/6 h-32 flex flex-col justify-evenly rounded-md p-3 bg-red-700 text-white md:h-72"
          >
            <Link href={`/usuarios/${users.nomeUsuario}`}>
              <RxAvatar size={40} />
            </Link>
            <h2 className="font-bold text-md p-5 md:text-xl">{users.nome}</h2>
            <p className="font-bold text-md p-5 md:text-xl">{users.email}</p>
            <p className="font-bold text-md p-5 md:text-xl">
              {users.nomeUsuario}
            </p>
          </div>
        ))}
      </main>
    </body>
  );
}
