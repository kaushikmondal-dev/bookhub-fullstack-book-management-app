"use client";

import { ArrowRight, Loader2Icon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { refresh } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import { toast } from "../shadcnui/toast";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { replace } = useRouter();

  const logoutHandler = async () => {
    setIsLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    const { error } = await authClient.signOut();

    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      });
    } else {
      toast.add({
        type: "success",
        title: "Logout Successfull !✅",
      });

      replace("/login");
      refresh();
    }

    setIsLoading(false);
  };
  return (
    <Button
      type="button"
      variant="outline"

      onClick={logoutHandler}
      className="bg-linear-to-r text-red-500"
      disabled={isLoading}>
      {isLoading ?
        <>
          <Loader2Icon className="animate-spin" />
          Logging out...
        </>
      : <>
          <ArrowRight />
          Logout
        </>
      }
    </Button>
  );
};

export default LogoutButton;
