import { BookOpen, Heart, Mail, User2Icon, UserPenIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/all-books" },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-linear-to-b from-slate-950 to-black">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2">
            <BookOpen
              className="text-emerald-300"
              size={26}
            />
            <span className="bg-linear-to-r from-emerald-300 via-sky-300 to-indigo-300 bg-clip-text text-2xl font-bold text-transparent">
              BookHub
            </span>
          </Link>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            Discover, share and manage your favorite books in one place.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wide uppercase">
            Quick Links
          </h3>
          <ul className="space-y-2 font-semibold">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href as Route}
                  className="text-sm font-semibold text-white transition-colors hover:text-green-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Accounts</h1>
          <div className="flex place-items-center gap-1 text-white hover:text-green-400">
            <User2Icon className="size-4" />
            <Link href={"/login"}>Login</Link>
          </div>
          <div className="flex place-items-center gap-1 text-white hover:text-green-400">
            <UserPenIcon className="size-4" />
            <Link href={"/register"}>Register</Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold tracking-wide uppercase">
            Contact
          </h3>
          <a
            href="mailto:support@bookhub.com"
            className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-green-400">
            <Mail size={16} />
            support@bookhub.com
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-1 text-center text-xs text-white">
          © {new Date().getFullYear()} BookHub. Made with
          <Heart
            size={12}
            className="fill-rose-500 text-rose-500"
          />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
