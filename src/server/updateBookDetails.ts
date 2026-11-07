"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/dbClient/prisma";
import { bookFormSchema, BookFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const updateBookDetails = async (
  bookId: string,
  //   select: { createdById: true },
  bookData: BookFormType,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { isSuccess: false, msg: "Please Login First !❌" };
  }

  const parsed = bookFormSchema.safeParse(bookData);
  if (!parsed.success) {
    return { isSuccess: false, msg: "Invalid data ❌" };
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
      return { isSuccess: false, msg: "You can't Updated this book ❌" };
    }

    await prisma.book.update({
      where: { id: bookId },
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath(`/book/${bookId}`);

    return {
      isSuccess: true,
      msg: "Book Update successfull ✅",
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
      msg: "Server error : Update Failed ❌",
    };
  }
};

export default updateBookDetails;
