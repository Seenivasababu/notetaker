import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-3 text-2xl font-bold">
        {session?.user.name ? `Notes for ${session.user.name}` : ""}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end flex gap-2">
          <div>
            {session && (
              <Image
                src={session.user.image ?? ""}
                alt=""
                width={"32"}
                height={"32"}
              />
            )}
          </div>
          <div>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-8 py-2 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
