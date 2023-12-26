
import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="navbar bg-gray-200 text-primary-content">
      <div className="flex-1 pl-3 text-2xl font-bold text-slate-900">
        {session?.user.name ? `Notes for ${session.user.name}` : ""}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end flex gap-2">
        
          <div>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full btn btn-neutral bg-slate-900  mx-4 px-8 py-1 font-semibold no-underline transition "
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
