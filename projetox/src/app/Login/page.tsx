"use client";
import Axios from "axios";
import { useRef, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import NavBar from "../NavBar/page";
import Link from "next/link";

type FormValues = {
  nomeUsuario: string;
  senha: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.nomeUsuario ? values : {},
    errors: !values.nomeUsuario
      ? {
          nomeUsuario: {
            type: "required",
            message: "Preencha para enviar!",
          },
          senha: {
            type: "required",
            message: "Preencha para enviar!",
          },
        }
      : {},
  };
};

export default function Login() {
  const [senhaVisivel, setSenhaVisivel] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>("");

  const verSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const form: any = useRef(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  Axios.defaults.withCredentials = true;
  const onSubmit = (e: any) => {
    Axios.post("http://localhost:8080/login", {
      nomeUsuario: e.nomeUsuario,
      senha: e.senha,
    })
      .then(async (res) => {
        if (res.data.Status === "Login efetuado") {
          console.log(res);
          await window.alert("Login efetuado");
          reset();
          setAuth(true);
          setUsername(res.data.username);
        } else if (res.data.Status === "Senha errada") {
          setAuth(false);
          window.alert("Senha errada");
          reset();
        } else if (res.data.Status === "Usuário não encontrado") {
          setAuth(false);
          window.alert("O usuário não foi encontrado");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {!auth ? (
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
          <NavBar />
          <div className="relative bg-red-700 text-white p-4 shadow-md w-2/3 m-auto mt-10 rounded-md md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm text-white font-bold text-md md:text-xl"
              >
                Nome de usuário:
              </label>
              <input
                {...register("nomeUsuario")}
                type="text"
                className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:black"
                placeholder="Seu nome de usuário"
              />
            </div>
            {errors?.nomeUsuario && (
              <p className="text-md text-white">{errors.nomeUsuario.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-white font-bold text-md md:text-xl"
              >
                Senha:
              </label>
              <input
                {...register("senha")}
                type={senhaVisivel ? "text" : "password"}
                className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
                placeholder="Sua senha"
              />
              <div
                className="text-black absolute bottom-8 right-6 cursor-pointer"
                onClick={verSenha}
              >
                {senhaVisivel ? (
                  <AiFillEyeInvisible size={36} />
                ) : (
                  <AiFillEye size={36} />
                )}
              </div>
            </div>
            {errors?.senha && (
              <p className="text-md text-white">{errors.senha.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-28 h-14 mt-10 flex justify-center items-center m-auto bg-green-300 font-bold text-md rounded-md md:text-xl hover:w-28 hover:bg-green-500 duration-300"
          >
            Enviar
          </button>

          <div className="text-center mt-3">
            <p>Não tem cadastro?</p>
            <h2 className=" text-xl my-3 font-bold hover:text-2xl hover:duration-500">
              <Link href="/Cadastro"> Cadastre-se </Link>
            </h2>
          </div>
        </form>
      ) : (
        <div>
          <NavBar />
          <div className="bg-red-700 text-white text-center p-8 rounded m-8">
            <h1 className="text-4xl font-bold">
              Bem-vindo ao RettiwT {username}!
            </h1>
            <p className="mt-4 text-lg">
              Explore as últimas novidades, dicas e experiências fascinantes que
              temos para oferecer. Estamos empolgados por tê-lo(a) conosco!
            </p>
            <p className="mt-2 text-xl underline hover:text-2xl hover:duration-500">
              <Link href={"/"}>Fazer meu primeiro post</Link>
            </p>
          </div>

          <div className="text-white bg-red-700 text-center p-6 m-8 rounded">
            <h2 className="text-2xl font-bold">Participe da Comunidade</h2>
            <p className="mt-2 text-lg">
              Junte-se à nossa comunidade e compartilhe suas experiências.
              Estamos ansiosos para ouvir suas histórias, opiniões e dicas e
              questionamentos.
            </p>
          </div>

          <div className="text-white bg-red-700 text-center p-6 m-8 rounded">
            <h2 className="text-2xl font-bold">Interaja com seus amigos</h2>
            <p className="mt-2 text-lg">
              Curta, comente e debata em todos os posts que quiser, mantendo o
              respeito sempre.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
