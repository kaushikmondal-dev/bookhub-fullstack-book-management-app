"use client";

import deleteBook from "@/server/deleteBook";
import { Loader2Icon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import { toast } from "../shadcnui/toast";

type DeleteBookProps = {
  bookId: string;
  bookImage: string;
};

const DeleteBook = ({ bookId, bookImage }: DeleteBookProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { refresh, push } = useRouter();

  const deleteBookHandler = async () => {
    setIsLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    const { isSuccess, msg } = await deleteBook(bookId, bookImage);

    if (isSuccess) {
      toast.add({
        title: msg,
      });
    } else {
      toast.add({
        title: msg,
      });
    }
    refresh();
    push("/all-books");

    setIsLoading(false);
  };
  return (
    <Button
      type="button"
      onClick={deleteBookHandler}
      disabled={isLoading}
      variant={"destructive"}>
      {isLoading ?
        <>
          <Loader2Icon className="animate-spin" />
          Deleting Book...
        </>
      : <>
          <Trash2 />
          Delete Book
        </>
      }
    </Button>
  );
};

export default DeleteBook;
