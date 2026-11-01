import UserLoginForm from "@/components/Auth/UserLoginForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login | BookHub",
  description: "Login Page Of BookHub App",
};

const page = async () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="mt-3.5 w-full max-w-sm text-white">
        <CardHeader className="place-items-center text-center">
          <Image
            src="/logo.png"
            alt="BookHub logo"
            width={50}
            height={50}
            className="block h-12 w-12 shrink-0 object-contain"
          />
          <CardTitle className="text-2xl">
            <h1>Welcome Back</h1>
          </CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <UserLoginForm />
      </Card>
    </section>
  );
};

export default page;
