"use client";
import Axios from "axios";
import { useRef, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import NavBar from "../NavBar/page";

type FormValues = {
  nome: string;
  nomeUsuario: string;
  email: string;
  senha: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.nome ? values : {},
    errors: !values.nome
      ? {
          nome: {
            type: "required",
            message: "Preencha para enviar!",
          },
          email: {
            type: "required",
            message: "Preencha para enviar!",
          },
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
    Axios.post("http://localhost:8080/Cadastro", {
      nome: e.nome,
      email: e.email,
      nomeUsuario: e.nomeUsuario,
      senha: e.senha,
    })
      .then((res) => {
        if (res.data.Status === "Success") {
          window.alert("Cadastro efetuado com sucesso");
          reset();
        } else if (res.data.Status === "Error") {
          window.alert("Usuário já tem perfil existente");
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
      <div className="bg-gray-500 text-gray-900 p-4 shadow-md w-2/3 m-auto mt-10 rounded-md md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Cadastro</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black font-bold text-md md:text-xl"
          >
            Nome:
          </label>
          <input
            {...register("nome")}
            type="text"
            className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
            placeholder="Seu nome e sobrenome"
          />
        </div>
        {errors?.nome && (
          <p className="text-md text-white">{errors.nome.message}</p>
        )}

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
            Email:
          </label>
          <input
            {...register("email")}
            type="text"
            className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
            placeholder="Seu email"
          />
        </div>
        {errors?.email && (
          <p className="text-md text-white">{errors.email.message}</p>
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
            type="password"
            className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
            placeholder="Sua senha"
          />
          <AiFillEye size={40} className="cursor-pointer right-10"/>
        </div>
        {errors?.senha && (
          <p className="text-md text-white">{errors.senha.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-28 h-14 mt-10 flex justify-center items-center m-auto bg-gray-300 font-bold text-md rounded-md md:text-xl hover:w-28 hover:bg-gray-500 duration-300"
      >
        Cadastrar
      </button>
    </form>
  );
}
