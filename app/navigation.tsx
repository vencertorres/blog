import SignOutButton from "@/components/signoutbutton";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Navigation() {
  const session = await getServerSession();

  return (
    <nav className="navbar border-b">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          Home
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            {session ? (
              <Link href="/new" className="btn text-base-100">
                Create post
              </Link>
            ) : (
              <Link href="/signin">Sign in</Link>
            )}
          </li>
        </ul>
        {session && (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn text-base normal-case">
              {session?.user?.name}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <SignOutButton />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
