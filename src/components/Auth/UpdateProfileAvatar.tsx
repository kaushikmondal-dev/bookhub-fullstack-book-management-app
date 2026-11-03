"use client";

import updateUserAvatar from "@/server/updateUserAvatar";
import { Loader2Icon, UserPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { toast } from "../shadcnui/toast";

type UpdateProfileAvatarProps = {
  prevImageUrl: string | null | undefined;
};

const UpdateProfileAvatar = ({ prevImageUrl }: UpdateProfileAvatarProps) => {
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refresh, push } = useRouter();

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
    validators: [
      new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 /*5Mb*/ }),
    ],
  });

  const updateProfileAvatarHandler = async () => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    const { isSuccess, msg } = await updateUserAvatar(
      prevImageUrl,
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

    push("/user-profile");
    setIsLoading(false);
  };

  return (
    <>
      <CardContent className="items-center">
        <button
          type="button"
          onClick={openFilePicker}
          className="grid place-items-center">
          {!isFile && (
            <Avatar className={"size-32"}>
              {prevImageUrl && <AvatarImage src={`/${prevImageUrl}`} />}

              <AvatarFallback>No Image</AvatarFallback>
            </Avatar>
          )}

          {filesContent.map((file) => (
            <Avatar
              key={file.name}
              className="size-32">
              <AvatarImage
                src={file.content}
                className="object-cover"
              />
              <AvatarFallback>{file.name}</AvatarFallback>
            </Avatar>
          ))}
        </button>
      </CardContent>
      <CardFooter>
        <Button
          onClick={updateProfileAvatarHandler}
          className={"w-full"}

          disabled={!isFile || isLoading}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" />
              Updating Avatar....
            </>
          : <>
              <UserPenIcon />
              Update Avatar
            </>
          }
        </Button>
      </CardFooter>
    </>
  );
};

export default UpdateProfileAvatar;
