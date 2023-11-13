"use client";
import NavBar from "./NavBar/page";
import Link from "next/link";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

type FormValues = {
  tituloPost: string;
  textoPost: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.tituloPost ? values : {},
    errors: !values.tituloPost
      ? {
          tituloPost: {
            type: "required",
            message: "Preencha para enviar!",
          },
          textoPost: {
            type: "required",
            message: "Preencha para enviar!",
          },
        }
      : {},
  };
};

export default function Home() {
  const [auth, setAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>("");

  const logOff = () => {
    setAuth(false);
    window.alert("Você se desconectou");
  };

  const form: any = useRef(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  axios.defaults.withCredentials = true;
  const onSubmit = (e: any) => {
    axios
      .post("http://localhost:8080/postagem", {
        tituloPost: e.tituloPost,
        textoPost: e.textoPost,
        nomeUsuario: username,
      })
      .then(async (res) => {
        if (res.data.Status === "Success") {
          console.log(res);
          await window.alert("Post enviado");
          reset();
        } else if (res.data.Status === "Error") {
          window.alert("Postagem com erro");
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div>
      {!auth ? (
        <main>
          <NavBar />
          <div className="bg-gray-500 h-screen flex flex-col items-center justify-center">
            <div className="mb-60 text-center">
              <h1 className="text-4xl font-black text-black mb-4">
                Bem-vindo ao BlogX
              </h1>
              <p className="text-2xl text-black">
                Seja parte da nossa comunidade e compartilhe suas histórias e
                conhecimentos conosco.
              </p>
              <button className="text-xl mt-2 underline font-bold hover:text-2xl duration-300">
                <Link href="/Cadastro">
                  Cadastre-se e compartilhe seus posts
                </Link>
              </button>
            </div>
          </div>
        </main>
      ) : (
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
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
            <p className="font-bold text-md hover:text-2xl duration-300 md:text-xl">
              {" "}
              <Link onClick={logOff} href="/Login">
                Logoff
              </Link>
            </p>
          </nav>
          <div className="relative bg-gray-500 text-gray-900 p-4 shadow-md w-2/3 m-auto mt-10 rounded-md md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Poste o seu conteúdo</h2>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black font-bold text-md md:text-xl"
              >
                Título Post:
              </label>
              <input
                required={true}
                {...register("tituloPost")}
                type="text"
                className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
                placeholder="Seu nome e sobrenome"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black font-bold text-md md:text-xl"
              >
                Contéudo:
              </label>
              <input
                required={true}
                {...register("textoPost")}
                type="text"
                className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
                placeholder="No que está pensando?"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-28 h-14 mt-10 flex justify-center items-center m-auto bg-green-300 font-bold text-md rounded-md md:text-xl hover:w-28 hover:bg-green-500 duration-300"
          >
            Postar
          </button>
        </form>
      )}
    </div>
  );
}
