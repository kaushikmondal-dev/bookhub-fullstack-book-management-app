import BookDetails from "@/components/Book/BookDetails";
import { auth } from "@/lib/auth";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Book Details | BookHub",
  description: "Book Details Page Of BookHub App",
};

type BookDetailsProps = { params: Promise<{ id: string }> };

const page = async ({ params }: BookDetailsProps) => {
  const { id } = await params;
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  const isOwner = !!session && session.user.id === book.createdById;

  return (
    <>
      <section className="relative min-h-dvh overflow-hidden bg-linear-to-b from-slate-900 via-slate-950 to-black px-4 pt-24 pb-10">
        <BookDetails
          book={book}
          isOwner={isOwner}
        />
      </section>
    </>
  );
};

export default page;
