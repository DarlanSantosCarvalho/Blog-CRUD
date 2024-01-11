"use client";
import axios from "axios";
import NavBar from "../../NavBar/page";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Perfil() {
  const router = useRouter();
  const { nomeUsuario } = router.query;
  const [dadoUsuario, setDadoUsuario] = useState<{}>();

  useEffect(() => {
    if (nomeUsuario) {
      axios.get(`http://localhost:8080/App/Usuarios/${nomeUsuario}`).then((res) => {
        setDadoUsuario(res.data);
      });
    }
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Olá</h1>
      <h2>{nomeUsuario}</h2>
    </div>
  );
}
