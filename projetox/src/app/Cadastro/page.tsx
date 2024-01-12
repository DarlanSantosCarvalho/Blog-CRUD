"use client";
import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import NavBar from "../NavBar/page";
import axios from "axios";

type FormValues = {
  nome: string;
  sobrenome: string;
  idade: number;
  profissao: string;
  biografia: string;
  nacionalidade: string;
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
          sobrenome: {
            type: "required",
            message: "Preencha para enviar!",
          },
          idade: {
            type: "required",
            message: "Preencha para enviar!",
          },
          biografia: {
            type: "required",
            message: "Preencha para enviar!",
          },
          profissao: {
            type: "required",
            message: "Preencha para enviar!",
          },
          nacionalidade: {
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
  const [senhaVisivel, setSenhaVisivel] = useState<boolean>(false);
  // const [listaPaises, setListaPaises] = useState<Array<String>>([]);

  // useEffect(() => {
  //   axios.get("https://servicodados.ibge.gov.br/api/v1/paises").then((res) => {
  //     setListaPaises(res.data);
  //     console.log(res.data)
  //   });
  // });

  const verSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const form = useRef(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = (e: any) => {
    Axios.post("http://localhost:8080/Cadastro", {
      nome: e.nome,
      sobrenome: e.sobrenome,
      idade: e.idade,
      profissao: e.profissao,
      biografia: e.biografia,
      email: e.email,
      nomeUsuario: e.nomeUsuario,
      senha: e.senha,
    })
      .then((res) => {
        console.log(e.nome, e.sobrenome, e.email, e.senha, e.nomeUsuario);
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
    <form
      className="bg-red-700 pb-10"
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <NavBar />
      <div className="relative bg-red-700 text-white p-4 shadow-md w-2/3 m-auto mt-10 rounded-md md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Cadastro</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm text-white font-bold text-md md:text-xl"
          >
            Nome:
          </label>
          <input
            {...register("nome")}
            type="text"
            className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
            placeholder="Seu nome"
          />
        </div>
        {errors?.nome && (
          <p className="text-md text-white">{errors.nome.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="Sobrenome"
            className="block text-sm text-white font-bold text-md md:text-xl"
          >
            Sobrenome:
          </label>
          <input
            {...register("sobrenome")}
            type="text"
            className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
            placeholder="Seu sobrenome"
          />
        </div>
        {errors?.sobrenome && (
          <p className="text-md text-white">{errors.sobrenome.message}</p>
        )}

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
            className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
            placeholder="Seu nome de usuário"
          />
        </div>
        {errors?.nomeUsuario && (
          <p className="text-md text-white">{errors.nomeUsuario.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm text-white font-bold text-md md:text-xl"
          >
            Idade
          </label>
          <input
            {...register("idade")}
            type="number"
            className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
            placeholder="Seu nome de usuário"
          />
        </div>
        {errors?.idade && (
          <p className="text-md text-white">{errors.idade.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm text-white font-bold text-md md:text-xl"
          >
            Profissão
          </label>
          <input
            {...register("profissao")}
            type="text"
            className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
            placeholder="Sua profissão ou ocupação"
          />
        </div>
        {errors?.profissao && (
          <p className="text-md text-white">{errors.profissao.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm text-white font-bold text-md md:text-xl"
          >
            Nacionalidade
          </label>
          <input
            {...register("nacionalidade")}
            type="text"
            className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
            placeholder="Seu país de nascimento"
          />
        </div>
        {errors?.nacionalidade && (
          <p className="text-md text-white">{errors.nacionalidade.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm text-white font-bold text-md md:text-xl"
          >
            Descrição
          </label>
          <input
            {...register("biografia")}
            type="text"
            className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
            placeholder="Fale sobre você"
          />
        </div>
        {errors?.biografia && (
          <p className="text-md text-white">{errors.biografia.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm text-white font-bold text-md md:text-xl"
          >
            Email:
          </label>
          <input
            {...register("email")}
            type="text"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            className="text-black border rounded-md px-3 py-2 w-full focus:ring focus:ring-black"
            placeholder="Exemplo@mail.com"
          />
        </div>
        {errors?.email && (
          <p className="text-md text-white">{errors.email.message}</p>
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
        Cadastrar
      </button>
    </form>
  );
}
