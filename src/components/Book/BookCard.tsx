"use client";

import { Book } from "@generated/prisma/client";
import { Eye, ImageIcon } from "lucide-react";
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
  books: Book;
};

const BookCard = ({ books }: BookCardProps) => {
  return (
    // <Card className="w-2xs overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <Card className="group to-cyan-800hover:-translate-y-1 to-indigo-900hover:shadow-xl relative w-2xs overflow-hidden border-0 bg-linear-to-br from-zinc-950 via-zinc-900 to-slate-800">
      <div className="flex justify-center px-6">
        <div className="relative aspect-2/3 w-30 overflow-hidden rounded-md border-2 border-slate-600">
          {books.image ?
            <Image
              src={`/${books.image}`}
              alt="book image"
              fill
              sizes="120px"
              className="object-cover transition duration-300 hover:scale-105"
            />
          : <div className="flex h-full w-full items-center justify-center bg-slate-700">
              <ImageIcon className="size-8 opacity-60" />
            </div>
          }
        </div>
      </div>
      <CardHeader className="place-items-center text-center">
        <CardTitle className="text-2xl">{books.title}</CardTitle>
        <CardContent>
          <span className="text-xl">{books.author}</span>
          <span>{books.category}</span>
          <span>{books.language}</span>
        </CardContent>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">
          <Link
            href={"/"}
            className="flex gap-2">
            <Eye />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
