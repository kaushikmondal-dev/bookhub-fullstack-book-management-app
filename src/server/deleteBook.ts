"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";

export const deleteBook = async (bookId: string, bookImage: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { isSuccess: false, msg: "Please Login First !❌" };
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { createdById: true },
    });

    if (!book) {
      return { isSuccess: false, msg: "Book not found ❌" };
    }

    const isOwner = book.createdById === session.user.id;

    if (!isOwner) {
      return { isSuccess: false, msg: "You can't delete this book ❌" };
    }

    await rm(`./public/${bookImage}`);

    await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    revalidatePath("/");
    return {
      isSuccess: true,
      msg: "Book Deleted successfull ✅",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        msg: "Somthing went to worng, try later ❌",
      };
    }

    return {
      isSuccess: false,
      msg: "Server error : delete Failed ❌",
    };
  }
};

export default deleteBook;
