"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";

import { headers } from "next/headers";
import { rm } from "node:fs/promises";
import sharp from "sharp";

const updateBookAvatar = async (
  bookId: string,
  bookPrevImage: string,
  imgFile: File,
) => {
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
      return { isSuccess: false, msg: "You can't Updated this book ❌" };
    }

    await rm(`./public/${bookPrevImage}`);

    const imageName = `${crypto.randomUUID()}.jpeg`;

    const imageArrayBuffer = await imgFile.arrayBuffer();

    await sharp(imageArrayBuffer)
      .resize({
        width: 400,
        height: 600,
      })
      .jpeg({
        mozjpeg: true,
        quality: 97,
      })
      .toFile(`./public/uploads/${imageName}`);

    const imageUrl = `uploads/${imageName}`;

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidatePath("/");
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

export default updateBookAvatar;
