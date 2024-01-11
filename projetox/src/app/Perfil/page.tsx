"use client";
import axios from "axios";
import NavBar from "../NavBar/page";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Perfil() {
  const { nomeUsuario } = useParams();
  const [dadoUsuario, setDadoUsuario] = useState<{}>();

  useEffect(() => {
    if (nomeUsuario) {
      axios.get(`http://localhost:8080/users/${nomeUsuario}`).then((res) => {
        setDadoUsuario(res.data);
      });
    }
  }, [nomeUsuario]);

  return (
    <div>
      <NavBar />
      <h1>Olá {nomeUsuario}</h1>
    </div>
  );
}
