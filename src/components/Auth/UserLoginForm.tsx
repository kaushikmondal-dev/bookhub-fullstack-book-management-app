"use client";

import { authClient } from "@/lib/auth-client";
import { loginFormSchema, LoginFormType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { Checkbox } from "../shadcnui/checkbox";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { toast } from "../shadcnui/toast";

const UserLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    mode: "all",
  });

  const userLoginHandler = async (logData: LoginFormType) => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    const { error } = await authClient.signIn.email(logData);

    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      });
    } else {
      toast.add({
        type: "success",
        title: "Login Successfull !!✅",
      });
      replace("/");
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(userLoginHandler)}
      className="grid gap-4"
      noValidate>
      <div className="grid gap-3 px-6">
        <Button
          type="button"
          variant="outline"
          className="flex w-full items-center justify-center gap-2"
          //   onClick={() =>
          //     authClient.signIn.social({
          //       provider: "google",
          //       callbackURL: "/",
          //     })
          //   }
        >
          <FcGoogle />
          <span>Login with Google</span>
        </Button>
      </div>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        Or continue with
      </FieldSeparator>
      <CardContent>
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
                autoComplete="email"
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
          name="rememberMe"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              data-invalid={fieldState.invalid}>
              <Checkbox
                id={field.name}
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel
                htmlFor={field.name}
                className="font-normal">
                Remember me
              </FieldLabel>
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
              <Loader2
                className="animate-spin"
                size={18}
              />
              Signing in ...
            </>
          : <>Sign In</>}
        </Button>
        <div className="flex justify-center gap-1">
          Don&apos;t have an account ?
          <Link
            href={"/register"}
            className="text-cyan-400 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default UserLoginForm;
