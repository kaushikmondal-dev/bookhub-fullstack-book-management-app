import DeleteBook from "@/components/Book/DeleteBook";
import { buttonVariants } from "@/components/shadcnui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/dbClient/prisma";
import { cn } from "cn";
import { BookX, Eye, Pencil } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "User Dashboard | BookHub",
  description: "User Dashboard Page of BookHub App",
};

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const myBooks = await prisma.book.findMany({
    where: { createdById: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!myBooks) notFound();

  if (myBooks.length === 0) {
    return (
      <section className="min-h-dvh px-5 py-28">
        <h1 className="text-3xl font-bold text-teal-500">Dashboard</h1>
        <h1 className="text-muted-foreground flex font-semibold">
          <p>Welcome back,</p>
          <p className="text-cyan-600">{session.user.name}</p>
        </h1>
        <p className="text-2xl font-bold">Total Books : {myBooks.length}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"></div>

        <p className="mt-10 mb-4 text-xl font-semibold">My Books : </p>
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
      <section className="min-h-dvh px-5 py-22">
        <h1 className="text-3xl font-bold text-teal-500">Dashboard</h1>
        <h1 className="text-muted-foreground flex font-semibold">
          <p>Welcome back,</p>
          <p className="text-cyan-600">{session.user.name}</p>
        </h1>
        <p className="text-2xl font-bold">Total Books : {myBooks.length}</p>

        <p className="mt-10 mb-4 text-xl font-semibold">My Books : </p>

        <section className="overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="text-muted-foreground bg-white/5">
              <tr>
                <th className="px-4 py-3">Cover</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-t">
                  <td className="px-4 py-3">
                    <Image
                      src={`/${book.image}`}
                      alt={book.title}
                      width={40}
                      height={56}
                      className="h-10 w-7 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{book.title}</td>
                  <td className="px-4 py-3">{book.author}</td>

                  <td className="px-4 py-3">{book.category}</td>
                  <td className="px-4 py-3">{book.language}</td>
                  <td className="px-4 py-3">
                    {book.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/book-details/${book.id}`}
                        className={cn(
                          buttonVariants({ size: "default" }),
                          "w-32 bg-sky-900 font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-90",
                        )}>
                        <Eye />
                        Details
                      </Link>
                      <Link
                        href={`/book/update-book/${book.id}`}
                        className={cn(
                          buttonVariants({ size: "default" }),
                          "w-32 bg-sky-900 font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-90",
                        )}>
                        <Pencil />
                        Edit
                      </Link>

                      <DeleteBook
                        bookId={book.id}
                        bookImage={book.image}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    );
  }
};

export default page;
