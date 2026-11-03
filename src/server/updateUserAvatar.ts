"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";
import sharp from "sharp";

export const updateUserAvatar = async (
  prevImageUrl: string | null | undefined,
  newImGFile: File,
) => {
  try {
    if (prevImageUrl !== null) {
      await rm(`./public/${prevImageUrl}`);
    }

    const imageName = `${crypto.randomUUID()}.jpeg`;

    const imageArrayBuffer = await newImGFile.arrayBuffer();

    await sharp(imageArrayBuffer)
      .resize({
        width: 256,
        height: 256,
      })
      .jpeg({
        mozjpeg: true,
        quality: 97,
      })
      .toFile(`./public/uploads/${imageName}`);

    const imageUrl = `uploads/${imageName}`;

    await auth.api.updateUser({
      headers: await headers(),
      body: {
        image: imageUrl,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "User Avatar Updated ✅",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        msg: "Somthing Went to worng, try later!! ❌",
      };
    }

    return {
      isSuccess: false,
      msg: "Server error, Updation Failed ❌",
    };
  }
};

export default updateUserAvatar;
