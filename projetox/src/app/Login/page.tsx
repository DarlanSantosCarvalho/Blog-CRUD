"use client";
import Axios from "axios";
import { useRef, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
          <div className="relative bg-gray-500 text-gray-900 p-4 shadow-md w-2/3 m-auto mt-10 rounded-md md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black font-bold text-md md:text-xl"
              >
                Nome de usuário:
              </label>
              <input
                {...register("nomeUsuario")}
                type="text"
                className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
                placeholder="Seu nome de usuário"
              />
            </div>
            {errors?.nomeUsuario && (
              <p className="text-md text-white">{errors.nomeUsuario.message}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black font-bold text-md md:text-xl"
              >
                Senha:
              </label>
              <input
                {...register("senha")}
                type={senhaVisivel ? "text" : "password"}
                className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
                placeholder="Sua senha"
              />
              <div
                className="absolute bottom-8 right-6 cursor-pointer"
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
        </form>
      ) : (
        <div>
          <h2>Olá {username}</h2>
          <p><Link href={"/"}>Clique aqui</Link></p>
        </div>
      )}
    </div>
  );
}
