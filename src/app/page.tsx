import BookCard from "@/components/Book/BookCard";
import prisma from "@/lib/dbClient/prisma";
import { BookX } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | BookHub",
  description: "Home Page Of BookHub App",
};

const page = async () => {
  const allBooks = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  if (allBooks.length === 0) {
    return (
      <section className="min-h-dvh">
        <div className="h-80 bg-[url('/banner-home.png')] bg-cover bg-center bg-no-repeat"></div>
        <div className="mt-20 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-white/5 text-emerald-300">
            <BookX size={50} />
          </div>
          <h2 className="text-2xl font-semibold">No books found</h2>
          <p className="text-muted-foreground max-w-sm">
            There are no books yet. Be the first to add one!
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="min-h-dvh pb-16">
        <div className="h-80 bg-[url('/banner-home.png')] bg-cover bg-center bg-no-repeat"></div>
        <h2 className="px-5 pt-8 text-2xl font-semibold text-cyan-300">
          Latest Books :{" "}
        </h2>

        <div className="grid grid-cols-1 gap-8 px-5 pt-5 md:grid-cols-3 xl:grid-cols-5">
          {allBooks.map((item) => (
            <BookCard
              key={item.id}
              book={item}
            />
          ))}
        </div>
      </section>
    );
  }
};

export default page;
