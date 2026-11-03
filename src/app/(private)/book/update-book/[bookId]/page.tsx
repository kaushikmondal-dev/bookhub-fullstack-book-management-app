import UpdateBookAvatar from "@/components/Book/UpdateBookAvatar";
import UpdateBookDetails from "@/components/Book/UpdateBookDetails";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";
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

      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Update Book Details</CardTitle>
        </CardHeader>
        <UpdateBookDetails />
      </Card>
    </section>
  );
};

export default page;
