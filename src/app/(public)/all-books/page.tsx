import BookCard from "@/components/Book/BookCard";

import prisma from "@/lib/dbClient/prisma";
import { BookX } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Books | BookHub",
  description: "All Books Page of BookHub App",
};

const page = async () => {
  const allBooks = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });
  if (allBooks.length === 0) {
    return (
      <section className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-white/5 text-emerald-300">
          <BookX size={50} />
        </div>
        <h2 className="text-2xl font-semibold">No books found</h2>
        <p className="text-muted-foreground max-w-sm">
          There are no books yet. Be the first to add one!
        </p>
      </section>
    );
  }
  return (
    <div className="mb-10 min-h-dvh">
      <section className="grid grid-cols-1 gap-8 px-5 pt-24 md:grid-cols-3 xl:grid-cols-5">
        {allBooks.map((item) => (
          <BookCard
            key={item.id}
            book={item}
          />
        ))}
      </section>
    </div>
  );
};

export default page;
