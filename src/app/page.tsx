

import { getServerAuthSession } from "~/server/auth";
import Header from "./_components/Header";
import Content from "./_components/Content";

export default async function Home() {
  return (
    <main >
      <Header/>
      <Content/>
    </main>
  );
}

