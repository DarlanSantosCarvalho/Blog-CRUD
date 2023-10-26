"use client";
import NavBar from "../NavBar/page";

export default function Cadastro() {
  return (
    <main>
      <NavBar />
      <div className="bg-gray-200 text-gray-900 p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Faça seu post</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-800">
          Nome:
        </label>
        <input
          type="text"
          className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
          placeholder="Seu nome ou nome de usuário"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="título" className="block text-sm font-medium text-gray-800">
          Título:
        </label>
        <input
          type="text"
          className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
          placeholder="Título qualquer"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="conteúdo" className="block text-sm font-medium text-gray-800">
          Conteúdo:
        </label>
        <input
          type="text"
          className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-indigo-300"
          placeholder="Fique à vontade, expresse sua opinião"
        />
      </div>
</div>
    </main>
  );
}
