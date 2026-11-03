import { auth } from "@/lib/auth";
import { LogIn } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import HeaderUserMenu from "../HeaderUserMenu";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../shadcnui/button";
import NavLinks from "./NavLink";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow"
      aria-label="app-header">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-3">
        {/* Logo */}
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
            <span className="text-cyan-500">Book</span>
            <span className="text-amber-600">Hub</span>
          </span>
        </Link>

        {/* Nav —*/}
        <NavLinks />

        {/* Right side and dropdown */}
        <div className="flex items-center justify-end gap-4 font-semibold">
          {session ?
            <HeaderUserMenu
              name={session.user.name}
              email={session.user.email}
              image={session.user.image}
            />
          : <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex items-center gap-2 bg-teal-500 text-black hover:text-white",
              )}>
              <LogIn size={20} />
              Sign In
            </Link>
          }

          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
