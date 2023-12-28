"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/page";
import { RxAvatar } from "react-icons/rx";
import { FaRegSadTear } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegAngry } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";

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
          <Post key={itemsPost.idPost} post={itemsPost} />
        ))}
      </main>
    </body>
  );
}

function Post({ post }: { post: any }) {
  const [likeCounter, setLikeCounter] = useState<number>(0);
  const [loveCounter, setLoveCounter] = useState<number>(0);
  const [sadCounter, setSadCounter] = useState<number>(0);
  const [angryCounter, setAngryCounter] = useState<number>(0);

  function Like() {
    setLikeCounter((prevCounter) => prevCounter + 1);
  }

  function Love() {
    setLoveCounter((prevCounter) => prevCounter + 1);
  }

  function Sad() {
    setSadCounter((prevCounter) => prevCounter + 1);
  }

  function Angry() {
    setAngryCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <div
      className="w-2/6 h-32 flex mb-5 flex-col justify-evenly rounded-md p-3 bg-red-700 text-white shadow-md shadow-black md:h-72"
    >
      <RxAvatar size={40} />

      <h2 className="font-bold text-md p-5 md:text-xl">
        {post.nomeUsuario}
      </h2>

      <h2 className="font-bold text-md p-5 md:text-xl">
        {post.tituloPost}
      </h2>
      <p className="font-bold text-md p-5 md:text-xl">
        {post.textoPost}
      </p>
      <div className="flex justify-around text-center mt-5">
        <p onClick={Like} className="p-3 rounded-lg cursor-pointer">
          <FaRegThumbsUp size={40} /> {likeCounter}
        </p>

        <p onClick={Love} className="p-3 rounded-lg cursor-pointer">
          <FaRegHeart size={40} /> {loveCounter}
        </p>

        <p onClick={Sad} className="p-3 rounded-lg cursor-pointer">
          <FaRegSadTear size={40} /> {sadCounter}
        </p>

        <p onClick={Angry} className="p-3 rounded-lg cursor-pointer">
          <FaRegAngry size={40} /> {angryCounter}
        </p>
      </div>
    </div>
  );
}
