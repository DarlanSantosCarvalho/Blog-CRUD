"use client";
import axios from "axios";
import NavBar from "../../NavBar/page";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Perfil() {
  const { nomeUsuario } = useParams();
  const [dadoUsuario, setDadoUsuario] = useState<Array<string>>([]);

  useEffect(() => {
    if (nomeUsuario) {
      axios.get(`http://localhost:8080/Usuarios/${nomeUsuario}`).then((res) => {
        setDadoUsuario(res.data);
      });
    }
  }, []);

  return (
    <main className="flex text-center justify-around gap-10 my-20 items-center flex-col">
      <NavBar />
      {dadoUsuario.map((users: any) => (
        <div
          key={users.idUsuario}
          className="w-2/6 h-32 flex flex-col justify-evenly rounded-md p-3 bg-red-700 text-white md:h-72"
        >
          <h2 className="font-bold text-md p-5 md:text-xl">{users.nome}</h2>
          <p className="font-bold text-md p-5 md:text-xl">{users.email}</p>
          <p className="font-bold text-md p-5 md:text-xl">
            {users.nomeUsuario}
          </p>
        </div>
      ))}
    </main>
  );
}
