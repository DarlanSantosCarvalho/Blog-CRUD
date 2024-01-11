"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/page";
import { RxAvatar } from "react-icons/rx";

export default function PostsPage() {
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((res) => {
      setApiData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <body>
      <NavBar />
      <main className="flex text-center justify-around gap-10 my-20 items-center flex-col">
        {apiData.map((itemsPost: any) => (
          <Post key={itemsPost.idPost} post={itemsPost} />
        ))}
      </main>
    </body>
  );
}

function Post({ post }: { post: any }) {
  return (
    <div className="w-3/6 h-60 flex mb-5 flex-col justify-evenly relative rounded-md p-3 bg-red-700 text-white shadow-md shadow-black md:h-96">
      
      <div className="absolute top-3 flex">
        <RxAvatar size={40} />
        <h2 className="font-bold text-md p-2 md:text-l">{post.nomeUsuario}</h2>
      </div>

      <h2 className="font-bold text-md p-5 mt-5 md:text-xl">{post.tituloPost}</h2>
      <p className="font-bold text-md p-5 md:text-xl">{post.textoPost}</p>
      <div className="flex justify-around text-center mt-5">
      </div>
    </div>
  );
}
