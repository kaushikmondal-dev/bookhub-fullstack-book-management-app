import CreateBook from "@/components/Book/CreateBook";
import Header from "@/components/Layout/Header";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Create Book | BookHub",
  description: "Create Book Page Of BookHub App",
};

const page = async () => {
  const allBooks = await prisma.book.findMany();
  return (
    <>
      <Header />
      <section className="mt-10 grid h-dvh place-items-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="place-items-center text-center">
            <Image
              src={"/icon.png"}
              alt="icon"
              width={80}
              height={80}
              priority
              className="content-between"
            />
            <CardTitle className="text-2xl">Create Book</CardTitle>
          </CardHeader>
          <CreateBook books={allBooks} />
        </Card>
      </section>
    </>
  );
};

export default page;
