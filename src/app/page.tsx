import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import Header from "./_components/Header";
import Content from "./_components/Content";
import { api } from "~/trpc/react";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main >
      <Header/>
      <Content/>
    </main>
  );
}

