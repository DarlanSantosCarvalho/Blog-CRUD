"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/page";

export default function PostsPage() {
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((res) => {
      setApiData(res.data);
    });
  }, []);

  return (
    <body>
      <NavBar />
      <main className="flex text-center justify-around gap-10 my-20 items-center flex-col">
        {apiData.map((itemsPost: any) => (
          <div key={itemsPost.idPost} className="w-2/6 h-32 flex flex-col justify-evenly bg-gray-200 text-black md:h-72">
            <h2 className="font-bold">{itemsPost.tituloPost}</h2>
            <p>{itemsPost.textoPost}</p>
          </div>
        ))}
      </main>
    </body>
  );
}
