"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { toast } from "../shadcnui/toast";

type UserProfileDetailsProps = {
  prevName: string;
};

const userDetailsSchema = z.object({
  name: z.string().min(5, { error: "Min 5" }),
});

const UpdateProfileDetails = ({ prevName }: UserProfileDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: prevName,
    },

    mode: "all",
  });

  const updateUserDetilsHandler = async ({
    name,
  }: z.infer<typeof userDetailsSchema>) => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    const { error } = await authClient.updateUser({
      name,
    });

    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      });
    } else {
      toast.add({
        type: "success",
        title: "User Details Updated✅",
      });

      push("/user-profile");
    }

    setIsLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(updateUserDetilsHandler)}
      className="grid gap-5"
      noValidate>
      <CardContent>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>

              <Input
                {...field}
                id={field.name}
                type="text"

                aria-invalid={fieldState.invalid}
                placeholder="Enter Your name"
                autoComplete="name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>
      <CardFooter>
        <Button
          className={"w-full"}
          type="submit"
          disabled={isLoading || !isDirty}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" />
              Updating Details....
            </>
          : <>
              <UserPenIcon />
              Update Details
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default UpdateProfileDetails;
