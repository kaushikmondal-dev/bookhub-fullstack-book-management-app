"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/dbClient/prisma";
import { bookFormSchema, BookFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import sharp from "sharp";

export const createBook = async (cBook: BookFormType, imgFile: File) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { isSuccess: false, msg: "Please login first" };
  }
  const parsed = bookFormSchema.safeParse(cBook);
  if (!parsed.success) {
    return { isSuccess: false, msg: "Invalid data" };
  }

  try {
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

    await prisma.book.create({
      data: {
        ...parsed.data,
        image: imageUrl,
        createdById: session.user.id,
      },
    });

    revalidatePath("/book/all-books");

    return { isSuccess: true, msg: "Book Created ✅" };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        msg: "Somthing went to worng, try later ❌",
      };
    }
    return {
      isSuccess: false,
      msg: "Server error : Creation failed 🚫",
    };
  }
};
