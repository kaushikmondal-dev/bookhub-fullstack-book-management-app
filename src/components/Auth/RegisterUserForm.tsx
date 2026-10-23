"use client";

import { authClient } from "@/lib/auth-client";
import { registerFormSchema, RegisterFormType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2Icon, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { toast } from "../shadcnui/toast";

const RegisterUserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    mode: "all",
  });

  const registerHandler = async (regData: RegisterFormType) => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    const { error } = await authClient.signUp.email({
      name: regData.name,
      email: regData.email,
      password: regData.password,
    });

    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      });
    } else {
      toast.add({
        type: "success",
        title: "Welcome Back !✅",
      });
      push("/login");
    }
    setIsLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(registerHandler)}
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
                placeholder="Enter Your Name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>

              <Input
                {...field}
                id={field.name}
                type="email"

                aria-invalid={fieldState.invalid}
                placeholder="Enter Your Email"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"

                aria-invalid={fieldState.invalid}
                placeholder="Enter Your Password"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"

                aria-invalid={fieldState.invalid}
                placeholder="Enter Your confirmPassword"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full bg-linear-to-r from-cyan-900 to-teal-700 text-white"
          disabled={isSubmitting}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" />
              Signing Up... <ArrowRight />
            </>
          : <>
              <UserPlus />
              Sign Up
            </>
          }
        </Button>

        <div className="flex justify-center gap-1">
          Already have an account ?
          <Link
            href={"/login"}
            className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default RegisterUserForm;
