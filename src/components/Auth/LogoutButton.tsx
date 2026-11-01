"use client";

import { authClient } from "@/lib/auth-client";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import { toast } from "../shadcnui/toast";

const LogoutButton = () => {
  const [isLoading, setILoading] = useState(false);
  const { replace } = useRouter();
  const logoutHandler = async () => {
    setILoading(true);

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
        title: "LogOut Successfull !!✅",
      });
      replace("/login");
    }

    setILoading(false);
  };

  return (
    <Button
      type="button"
      onClick={logoutHandler}
      variant={"destructive"}
      disabled={isLoading}>
      {isLoading ?
        <>
          <Loader2Icon className="animate-spin" />
          Logging out...
        </>
      : <>
          <ArrowRight /> Logout
        </>
      }
    </Button>
  );
};

export default LogoutButton;
