"use client";
import axios from "axios";
import NavBar from "../../NavBar/page";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { RxAvatar } from "react-icons/rx";

const Perfil = () => {
  const { nomeUsuario } = useParams();
  const [dadoUsuario, setDadoUsuario] = useState<any>([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/Usuarios/${nomeUsuario}`).then((res) => {
      setDadoUsuario(res.data.Message[0]);
    });
  }, [nomeUsuario]);

  return (
    <main>
      <NavBar />

      <div className="max-w-md m-auto bg-red-600 rounded p-4 shadow-md text-white">
        <div className="mt-4 text-center flex flex-col gap-3">
          <RxAvatar size={40} />
          <h2 className="text-md font-bold lg:text-xl">
            {dadoUsuario.nomeUsuario}
          </h2>
          <p className="text-md lg:text-l">
            Nome: {dadoUsuario.nome} {dadoUsuario.sobrenome}
          </p>
          <p className="text-md lg:text-l">Email: {dadoUsuario.email}</p>
          <p className="text-md lg:text-l">Idade: {dadoUsuario.idade} anos</p>
          <p className="text-md lg:text-l">
            Nação: {dadoUsuario.nacionalidade}
          </p>
          <p className="text-md lg:text-l">
            Profissão: {dadoUsuario.profissao}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Perfil;
