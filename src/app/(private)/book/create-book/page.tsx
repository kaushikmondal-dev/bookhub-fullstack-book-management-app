import CreateBook from "@/components/Book/CreateBook";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Book Create | BookHub",
  description: "Book Create Page of BookHub App",
};

const page = async () => {
  const allBooks = await prisma.book.findMany();
  return (
    <section className="relative min-h-dvh overflow-hidden bg-linear-to-b from-slate-900 via-slate-950 to-black px-4 pt-24 pb-10">
      <div className="size-500px] pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="size-400px] pointer-events-none absolute top-1/3 -left-32 rounded-full bg-indigo-600/25 blur-3xl" />
      <div className="size-400px] pointer-events-none absolute -right-32 bottom-0 rounded-full bg-cyan-500/20 blur-3xl" />
      <section className="mt-15 grid h-dvh place-items-center">
        <Card className="w-full max-w-2xl border-white/10 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 shadow-xl">
          <CardHeader className="place-items-center text-center">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={80}
              height={80}
              priority
              className="content-between"
            />
            <CardTitle className="text-2xl">Create Book</CardTitle>
          </CardHeader>
          <CreateBook book={allBooks} />
        </Card>
      </section>
    </section>
  );
};

export default page;
