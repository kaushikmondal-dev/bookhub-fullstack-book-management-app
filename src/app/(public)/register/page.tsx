import RegisterUserForm from "@/components/Auth/RegisterUserForm";
import Header from "@/components/Layout/Header";
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
    <>
      <Header />
      <section className="mt-7 grid h-dvh place-items-center">
        <Card className="w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto">
              <Image
                src="/icon.png"
                alt="icon"
                width={80}
                height={80}
                priority
                className="content-between"
              />
            </div>
            <CardTitle className="text-2xl">
              <h1>Create Account</h1>
            </CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <RegisterUserForm />
        </Card>
      </section>
    </>
  );
};

export default page;
