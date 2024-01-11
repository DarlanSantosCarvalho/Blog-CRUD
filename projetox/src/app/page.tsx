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
      })
      .then(async (res) => {
        if (res.data.Status === "Success") {
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
          <div className="bg-red-700 h-screen flex flex-col items-center justify-center">
            <div className="mb-60 text-center">
              <h1 className="text-4xl font-black text-white mb-4">
                Bem-vindo ao BlogX
              </h1>
              <p className="text-2xl text-white">
                Seja parte da nossa comunidade e compartilhe suas histórias e
                conhecimentos conosco.
              </p>
              <button className="text-xl mt-2 underline text-white font-bold hover:text-2xl duration-300">
                <Link href="/Cadastro">
                  Cadastre-se e compartilhe seus posts
                </Link>
              </button>
            </div>
          </div>
        </main>
      ) : (
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
          <NavBar />
          <div className="relative bg-red-700 text-white p-4 shadow-md w-2/3 m-auto mt-10 rounded-md md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">No que está pensando?</h2>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm text-white font-bold text-md md:text-xl"
              >
                Título Post:
              </label>
              <input
                {...register("tituloPost")}
                type="text"
                className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
                placeholder="Título do Post"
              />
            </div>
            {errors?.tituloPost && (
              <p className="text-md text-white">{errors.tituloPost.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm text-white font-bold text-md md:text-xl"
              >
                Contéudo:
              </label>
              <input
                {...register("textoPost")}
                type="text"
                className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
                placeholder="No que está pensando?"
              />
            </div>
            {errors?.textoPost && (
              <p className="text-md text-white">{errors.textoPost.message}</p>
            )}
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
