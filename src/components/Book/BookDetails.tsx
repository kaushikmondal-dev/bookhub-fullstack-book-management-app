// components/Books/BookDetails.tsx
import { buttonVariants } from "@/components/shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Book } from "@generated/prisma/client";
import { cn } from "cn";
import {
  ArrowLeft,
  CalendarDays,
  DollarSign,
  FileText,
  Languages,
  Pencil,
  Tags,
  User,
} from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import DeleteBook from "./DeleteBook";

type BookDetailsProps = {
  book: Book;
  isOwner: boolean;
};

const infoBox =
  "rounded-2xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-emerald-400/40 hover:bg-white/10";
const iconBox =
  "mb-2 flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald-400/20 to-sky-500/20 text-emerald-300";
const labelClass = "text-muted-foreground text-xs tracking-wide uppercase";

const BookDetails = ({ book, isOwner }: BookDetailsProps) => {
  return (
    <Card className="w-full border-white/10 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 shadow-xl shadow-emerald-500/10">
      <CardHeader className="gap-3">
        <Link
          href="/all-books"
          className="text-muted-foreground inline-flex w-fit items-center gap-1.5 text-sm transition-colors hover:text-lime-400">
          <ArrowLeft size={16} />
          Back to all books
        </Link>
        <CardTitle className="bg-linear-to-r from-emerald-300 via-sky-300 to-indigo-300 bg-clip-text text-center text-3xl text-transparent">
          Book Details
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Cover */}
        <div className="max-w-240px mx-auto w-full">
          <div className="rounded-2xl bg-linear-to-br from-emerald-400/40 via-sky-500/30 to-indigo-500/40 p-1 shadow-xl">
            <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-slate-900">
              <Image
                src={`/${book.image}`}
                alt={book.title}
                fill
                priority
                sizes="240px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-300 uppercase">
              <Tags size={14} />
              {book.category}
            </span>
            <h1 className="text-3xl leading-tight font-bold">{book.title}</h1>
            <p className="text-muted-foreground flex items-center gap-1.5">
              <User size={18} />
              by {book.author}
            </p>
          </div>

          <div className="flex items-center gap-1 text-3xl font-bold text-lime-400">
            <DollarSign size={28} />
            {String(book.price)}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className={infoBox}>
              <div className={iconBox}>
                <User size={18} />
              </div>
              <p className={labelClass}>Author</p>
              <p className="mt-0.5 font-medium break-all">{book.author}</p>
            </div>

            <div className={infoBox}>
              <div className={iconBox}>
                <Languages size={18} />
              </div>
              <p className={labelClass}>Language</p>
              <p className="mt-0.5 font-medium break-all">{book.language}</p>
            </div>

            <div className={infoBox}>
              <div className={iconBox}>
                <Tags size={18} />
              </div>
              <p className={labelClass}>Category</p>
              <p className="mt-0.5 font-medium break-all">{book.category}</p>
            </div>

            <div className={infoBox}>
              <div className={iconBox}>
                <FileText size={18} />
              </div>
              <p className={labelClass}>Pages</p>
              <p className="mt-0.5 font-medium">{String(book.pages)}</p>
            </div>

            <div className={infoBox}>
              <div className={iconBox}>
                <CalendarDays size={18} />
              </div>
              <p className={labelClass}>Published</p>
              <p className="mt-0.5 font-medium">{String(book.publishedYear)}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">About this book</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {book.description}
            </p>
          </div>
        </div>
      </CardContent>

      {/*Only Owner */}

      {isOwner && (
        <CardFooter className="flex-wrap justify-end gap-3">
          <Link
            href={`/book/update-book/${book.id}` as Route}
            className={cn(
              buttonVariants({ size: "default" }),
              "w-32 bg-sky-900 font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-90",
            )}>
            <Pencil />
            Edit Book
          </Link>

          <DeleteBook
            bookId={book.id}
            bookImage={book.image}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default BookDetails;
