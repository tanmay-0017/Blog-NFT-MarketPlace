import { AnchorProvider, Program } from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "src/context/functions/getPostById";
import idl from "src/idl.json";

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

function getProgram(provider) {
  return new Program(idl, PROGRAM_KEY, provider);
}

export const FullPost = () => {
  const { id } = useParams();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [provider, setProvider] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    try {
      if (provider) {
        const getPost = async () => {
          const program = getProgram(provider);
          const post = await getPostById(id.toString(), program);
          setPost(post);
        };
        getPost();
      }
    } catch { }
  }, [provider]);

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
    }
  }, [connection, wallet]);


  return (
    <article className="hentry background-color">
      <div className="featured-image">
        <img
          src="https://miro.medium.com/max/780/0*xZfkXFyVWVvANihY.jpg"
          alt=""
        />
      </div>
      <h1 className="entry-title">{post?.title}</h1>
      <div className="entry-meta">
        <p className="pink-heading">
          <span className="author">
            Written by <a href="https://www.linkedin.com/in/tanmayarora17/">User</a>
          </span>{" "}
          <span className="date">Monday, November 19, 2022</span>
        </p>
      </div>
      <div className="entry-content">
        <p className="postContent">{post?.content}</p>
      </div>
    </article>
  );
};

