"use client";

import { Book } from "@generated/prisma/client";
import { EyeIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="group hover:shadow-cyan-950/ relative ml-2 w-56 gap-3 overflow-hidden border border-slate-700/70 bg-linear-to-br from-[#171b24] via-[#202936] to-[#111827] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-700/70 hover:shadow-xl">
      {/* Book Cover Image */}
      <div className="flex justify-center px-6 pt-6">
        <div className="relative aspect-2/3 w-30 overflow-hidden rounded-md border border-slate-600 bg-slate-800">
          {book.image ?
            <Image
              src={`/${book.image}`}
              alt={`${book.title} book cover`}
              fill
              sizes="120px"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          : <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="size-8 text-slate-400" />
            </div>
          }
        </div>
      </div>
      <CardHeader className="place-items-center text-center">
        <CardTitle className="line-clamp-1 text-base">{book.title}</CardTitle>
        <CardContent>
          <span className="line-clamp-1 text-sm text-slate-200">
            {book.author}
          </span>
          <span className="text-xs text-slate-400">{book.category}</span>
        </CardContent>
      </CardHeader>
      <CardFooter>
        <Button className="w-full bg-sky-900">
          <Link
            href={`/book-details/${book.id}`}
            className="flex gap-2">
            <EyeIcon />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
