import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";


export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const mutation = api.quiz.create.useMutation();
  const quiz = api.quiz.getList.useQuery();
  
  const handleClick = async () => {
    console.log("hello world!")
    // Need to make a call to my backend service to create a new quiz
    mutation.mutate() 
  }

  return (
    <>
     <button className="btn btn-primary" onClick={handleClick}>Create new quiz</button>
     {quiz.data?.map((quiz) => {return <div key={quiz.id}>{quiz.title}</div>})} 
    </>
  );
}


function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
