import { auth } from "@/lib/auth";
import { LogIn } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import HeaderUserMenu from "../HeaderUserMenu";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../shadcnui/button";
import NavLinks from "./NavLink";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-2 px-3 py-3 sm:px-6 md:grid md:grid-cols-3">
        {/* Logo */}
        <Link
          href="/"
          className="order-1 flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="BookHub logo"
            width={40}
            height={40}

            className="block h-12 w-auto shrink-0 object-contain"
          />
          <span className="flex text-3xl leading-none font-bold">
            <span className="text-teal-500">Book</span>
            <span className="text-orange-600">Hub</span>
          </span>
        </Link>

        {/* Nav —*/}
        <div className="order-3 flex w-full justify-center md:order-2 md:w-auto">
          <NavLinks />
        </div>
        {/* Right side and dropdown */}
        <div className="order-2 flex items-center justify-end gap-2 font-semibold sm:gap-4 md:order-3">
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
                "flex items-center gap-2 bg-teal-400 text-black hover:bg-teal-500 hover:text-black",
              )}>
              <LogIn size={20} />
              Sign In
            </Link>
          }

          {/* <ThemeToggleButton /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
