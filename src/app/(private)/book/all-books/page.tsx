import BookCard from "@/components/Book/BookCard";
import Header from "@/components/Layout/Header";
import { Card, CardContent } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Books | BookHub",
  description: "All Books Page Of BookHub App",
};

const page = async () => {
  const allBooks = await prisma.book.findMany();

  if (allBooks.length === 0) {
    return (
      <section className="grid h-dvh place-items-center">
        <Card>
          <CardContent className="text-xl">No Books Found</CardContent>
        </Card>
      </section>
    );
  }
  return (
    <>
      <Header />
      <section className="mt-20 ml-10 grid grid-cols-1 place-items-center gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {allBooks.map((item) => (
          <BookCard
            key={item.id}
            books={item}
          />
        ))}
      </section>
    </>
  );
};

export default page;
