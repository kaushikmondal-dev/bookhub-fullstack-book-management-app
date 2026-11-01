import UserRegisterForm from "@/components/Auth/UserRegisterForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Register | BookHub",
  description: "Register Page Of BookHub App",
};

const page = async () => {
  return (
    <section className="mt-6 grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="place-items-center text-center">
          <Image
            src="/logo.png"
            alt="BookHub logo"
            width={50}
            height={50}
            className="block h-12 w-12 shrink-0 object-contain"
          />
          <CardTitle className="text-2xl">
            <h1>Create Account</h1>
          </CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <UserRegisterForm />
      </Card>
    </section>
  );
};

export default page;
