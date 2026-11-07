"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center gap-8 font-semibold">
      <Link
        href="/"
        className={`transition-colors ${
          pathname === "/" ? "text-green-400" : (
            "text-white hover:text-green-400"
          )
        }`}>
        Home
      </Link>

      <Link
        href="/all-books"
        className={`transition-colors ${
          pathname.startsWith("/all-books") ? "text-green-400" : (
            "text-white hover:text-green-400"
          )
        }`}>
        Books
      </Link>

      {/* <Link
        href="/"
        className={`transition-colors ${
          pathname.startsWith("/category") ? "text-green-400" : (
            "text-white hover:text-green-400"
          )
        }`}>
        Category
      </Link> */}
    </nav>
  );
};

export default NavLinks;
