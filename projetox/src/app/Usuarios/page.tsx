"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/page";

export default function usersPage() {
  const [apiData, setApiData] = useState<any[]>([]);

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
          <div key={users.idUsuario} className="w-2/6 h-32 flex flex-col justify-evenly bg-gray-200 text-black md:h-72">
            <h2 className="font-bold">{users.nome}</h2>
            <p>{users.email}</p>
            <p>{users.nomeUsuario}</p>
          </div>
        ))}
      </main>
    </body>
  );
}
