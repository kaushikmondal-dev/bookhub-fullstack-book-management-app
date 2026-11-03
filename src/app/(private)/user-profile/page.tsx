import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import { buttonVariants } from "@/components/shadcnui/button";
import { auth } from "@/lib/auth";
import { cn } from "cn";
import { BookOpen, Library, Mail, User, UserPen } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "User Profile | BookHub",
  description: "User Profile Page of BookHub App",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const { email, name, image } = session.user;

  return (
    <>
      <main className="relative min-h-dvh overflow-hidden bg-linear-to-b from-slate-900 via-slate-950 to-black px-4 pt-24 pb-16">
        <div className="relative mx-auto max-w-4xl space-y-6">
          {/* Profile card */}
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-800/60 via-slate-900/70 to-slate-950/80 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
            {/* Banner */}
            <div className="h-36 bg-linear-to-r from-amber-700 to-cyan-700 sm:h-44">
              <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_50%)]" />
            </div>

            <div className="px-6 pb-8 sm:px-10">
              <div className="-mt-16 flex flex-col items-center gap-6 sm:-mt-14 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="rounded-full bg-linear-to-br from-emerald-400 via-sky-500 to-indigo-500 p-1 shadow-xl">
                  <Avatar className="size-32 border-4 border-slate-950 sm:size-36">
                    {image && (
                      <AvatarImage
                        src={`/${image}`}
                        alt={name}
                        className="object-cover"
                      />
                    )}
                    <AvatarFallback className="bg-slate-800 text-3xl font-bold">
                      {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name + role */}
                <div className="flex-1 space-y-1 text-center sm:pb-2 sm:text-left">
                  <h1 className="bg-linear-to-r from-emerald-300 via-sky-300 to-indigo-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                    {name}
                  </h1>
                  <p className="text-muted-foreground">{email}</p>
                </div>

                {/* Update button */}
                <Link
                  href="/user-profile/update"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-400 font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] hover:opacity-90 sm:mb-2",
                  )}>
                  <UserPen />
                  Update Profile
                </Link>
              </div>
            </div>
          </section>

          {/* Account details */}
          <section className="rounded-3xl border border-white/10 bg-linear-to-br from-slate-800/60 via-slate-900/70 to-slate-950/80 p-6 backdrop-blur-xl sm:p-8">
            <h2 className="mb-5 text-xl font-semibold">Account Details</h2>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Full Name */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-emerald-400/40 hover:bg-white/10">
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400/20 to-sky-500/20 text-emerald-300">
                  <User size={20} />
                </div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Full Name
                </p>
                <p className="mt-1 font-medium break-all">{name}</p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-emerald-400/40 hover:bg-white/10">
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400/20 to-sky-500/20 text-emerald-300">
                  <Mail size={20} />
                </div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Email
                </p>
                <p className="mt-1 font-medium break-all">{email}</p>
              </div>
            </div>
          </section>

          {/* Quick links */}
          <section className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/all-books"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-0.5 hover:border-lime-400/40 hover:bg-white/10">
              <div className="flex size-12 items-center justify-center rounded-xl bg-lime-400/15 text-lime-400">
                <BookOpen />
              </div>
              <div>
                <p className="font-semibold">Browse Books</p>
                <p className="text-muted-foreground text-sm">
                  Explore the whole collection
                </p>
              </div>
            </Link>

            <Link
              href="/book/create-book"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-white/10">
              <div className="flex size-12 items-center justify-center rounded-xl bg-sky-400/15 text-sky-400">
                <Library />
              </div>
              <div>
                <p className="font-semibold">Add a Book</p>
                <p className="text-muted-foreground text-sm">
                  Create a new book entry
                </p>
              </div>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
};

export default page;
