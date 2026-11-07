"use client";

import updateBookAvatar from "@/server/updateBookAvatar";
import { Loader2Icon, PenIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { toast } from "../shadcnui/toast";

type UpdateAvatarProps = {
  bookId: string;
  bookPrevImage: string;
};

const UpdateBookAvatar = ({ bookId, bookPrevImage }: UpdateAvatarProps) => {
  const [isFile, setIsFile] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { refresh } = useRouter();

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",

    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),

    validators: [
      new FileSizeValidator({
        maxFileSize: 5 * 1024 * 1024 /* 5MB */,
      }),
    ],
  });

  const updateBookAvatarHandler = async () => {
    setIsLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    const { isSuccess, msg } = await updateBookAvatar(
      bookId,
      bookPrevImage,
      plainFiles[0],
    );

    if (isSuccess) {
      toast.add({
        title: msg,
      });
      refresh();
    } else {
      toast.add({
        title: msg,
      });
    }

    clear();
    setIsLoading(false);
  };

  return (
    <>
      <CardContent className="grid place-items-center gap-4">
        {!isFile && (
          <button
            type="button"
            onClick={openFilePicker}
            className="relative aspect-2/3 w-40 overflow-hidden rounded-md border">
            <Image
              src={`/${bookPrevImage}`}

              alt="Book cover"
              fill
              sizes="160px"
              priority
              className="object-cover"
            />
          </button>
        )}

        {filesContent.map(({ size, content }) => (
          <button
            key={size}
            type="button"
            onClick={openFilePicker}
            className="relative aspect-2/3 w-40 overflow-hidden rounded-md border">
            <Image
              src={content}

              alt="Book cover"
              fill
              sizes="160px"
              priority
              className="object-cover"
            />
          </button>
        ))}
      </CardContent>
      <CardFooter className="grid gap-4">
        <Button
          type="button"
          className={
            "w-full bg-teal-400 font-semibold text-black hover:bg-teal-600 sm:col-span-2"
          }
          onClick={updateBookAvatarHandler}
          disabled={isLoading || !isFile}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" />
              Updating Book Avatar...
            </>
          : <>
              <PenIcon />
              Update Book Avatar
            </>
          }
        </Button>
      </CardFooter>
    </>
  );
};

export default UpdateBookAvatar;
