"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/page";
import { RxAvatar } from "react-icons/rx";

export default function PostsPage() {
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((res) => {
      setApiData(res.data);
      console.log(apiData)
    });
  }, []);

  return (
    <body>
      <NavBar />
      <main className="flex text-center justify-around gap-10 my-20 items-center flex-col">
        {apiData.map((itemsPost: any) => (
          <div
            key={itemsPost.idPost}
            className="w-2/6 h-32 flex flex-col justify-around bg-red-700 text-white rounded-md md:h-72"
          >
            <div>
              <RxAvatar size={40} />
            </div>
            <h2 className="font-bold text-md p-5 md:text-xl">
              {itemsPost.tituloPost}
            </h2>
            <p className="font-bold text-md p-5 md:text-xl">
              {itemsPost.textoPost}
            </p>
          </div>
        ))}
      </main>
    </body>
  );
}
