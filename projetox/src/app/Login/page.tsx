"use client";
import Axios from "axios";
import { useRef, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import NavBar from "../NavBar/page";

type FormValues = {
  nome: string;
  nomeUsuario: string;
  email: string;
  senha: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.nomeUsuario ? values : {},
    errors: !values.nome
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

export default function Cadastro() {
  const [senhaVisivel, setSenhaVisivel] = useState<any>(false);

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
  const onSubmit = (e: any) => {
    Axios.post("http://localhost:8080/Login", {
      nomeUsuario: e.nomeUsuario,
      senha: e.senha,
    })
      .then((res) => {
        if (res.data.Status === "Success") {
          window.alert("Login efetuado com sucesso");
          reset();
        } else if (res.data.Status === "Error") {
          window.alert("Senha errada");
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
      <NavBar />
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
        className="w-28 h-14 mt-10 flex justify-center items-center m-auto bg-gray-300 font-bold text-md rounded-md md:text-xl hover:w-28 hover:bg-gray-500 duration-300"
      >
        Enviar
      </button>
    </form>
  );
}
