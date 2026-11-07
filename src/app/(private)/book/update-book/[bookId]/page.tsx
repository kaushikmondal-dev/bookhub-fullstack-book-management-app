import UpdateBookAvatar from "@/components/Book/UpdateBookAvatar";
import UpdateBookDetails from "@/components/Book/UpdateBookDetails";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update Book | BookHub",
  description: "Update Book Page Of BookHub App",
};

type UpdateBookProps = {
  params: Promise<{ bookId: string }>;
};

const page = async ({ params }: UpdateBookProps) => {
  const { bookId } = await params;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (book === null) {
    return notFound();
  }

  return (
    <>
      <Link
        href="/user-dashboard"
        className="text-muted-foreground mt-20 ml-10 inline-flex w-fit items-center gap-1.5 text-sm transition-colors hover:text-lime-400">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>
      <section className="grid min-h-dvh grid-cols-2 place-items-center">
        <Card className="w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Update Book Avatar</CardTitle>
          </CardHeader>
          <UpdateBookAvatar
            bookId={book.id}
            bookPrevImage={book.image}
          />
        </Card>

        <Card className="mt-10 w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Update Book Details</CardTitle>
          </CardHeader>
          <UpdateBookDetails
            bookId={book.id}
            bookData={book}
            key={book.id}
          />
        </Card>
      </section>
    </>
  );
};

export default page;
