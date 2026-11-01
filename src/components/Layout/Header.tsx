"use client";

import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../Auth/LogoutButton";
import { Button } from "../shadcnui/button";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  const pathname = usePathname();
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow"
      aria-label="app-header">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-3">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="BookHub logo"
              width={40}
              height={40}
              className="block h-10 w-10 shrink-0 object-contain"
            />
            <span className="flex text-2xl leading-none font-semibold">
              <h1 className="text-cyan-500">Book</h1>
              <h1 className="text-amber-600">Hub</h1>
            </span>
          </Link>
        </div>

        <nav className="flex items-center justify-center gap-16">
          <div className="flex gap-1 space-x-6 font-semibold">
            <Link
              href={"/"}
              className={`flex items-center gap-1 transition-colors ${
                pathname === "/" ? "text-green-400" : (
                  "text-white hover:text-green-400"
                )
              }`}>
              Home
            </Link>
            <Link
              href={"/"}
              className={`flex items-center gap-1 transition-colors ${
                pathname === "/" ? "text-green-400" : (
                  "text-white hover:text-green-400"
                )
              }`}>
              Books
            </Link>
            <Link
              href="/"
              className={`flex items-center gap-1 transition-colors ${
                pathname === "/" ? "text-green-400" : (
                  "text-white hover:text-green-400"
                )
              }`}>
              Category
            </Link>
          </div>
        </nav>

        <div>
          <div className="flex items-center justify-end gap-4 font-semibold">
            <Button
              size="lg"

              className="amber-600 border border-mauve-500 bg-transparent text-blue-600 transition-colors duration-300 hover:text-white">
              <User2 size={20} />
              <Link
                href="/login"
                className="font-semibold">
                Sign In
              </Link>
            </Button>
            <LogoutButton />
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
