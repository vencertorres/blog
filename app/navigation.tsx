import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="navbar sticky top-0 border-b bg-base-200">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          Home
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu px-1">
          <li>
            <Link href="/new">Create post</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
