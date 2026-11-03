import UpdateProfileAvatar from "@/components/Auth/UpdateProfileAvatar";
import UpdateProfileDetails from "@/components/Auth/UpdateProfileDetails";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { auth } from "@/lib/auth";
import { ImageUp, UserPen } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "User Profile Update | BookHub",
  description: "User Profile Update Page of BookHub App",
};

const cardClass =
  "w-full max-w-md gap-4 rounded-3xl border border-white/10 bg-linear-to-br from-slate-800/60 via-slate-900/70 to-slate-950/80 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/30";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const { name, image } = session.user;

  return (
    <>
      <main className="relative min-h-dvh overflow-hidden bg-linear-to-b from-slate-900 via-slate-950 to-black px-4 pt-28 pb-16">
        <div className="relative mx-auto max-w-5xl space-y-10">
          {/* Page heading */}
          <div className="space-y-2 text-center">
            <h1 className="bg-linear-to-r from-emerald-300 via-sky-300 to-indigo-300 bg-clip-text text-4xl font-bold text-transparent">
              Update Your Profile
            </h1>
            <p className="text-muted-foreground">
              Update your avatar and personal details
            </p>
          </div>

          <section className="grid place-items-start gap-8 md:grid-cols-2">
            {/* Avatar card */}
            <Card
              className={`${cardClass} justify-self-center md:justify-self-end`}>
              <CardHeader className="place-items-center text-center">
                <div className="rounded-2xl bg-linear-to-br from-emerald-400/20 to-sky-500/20 p-3">
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    width={64}
                    height={64}
                    priority
                  />
                </div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ImageUp
                    size={22}
                    className="text-emerald-400"
                  />
                  Update Avatar
                </CardTitle>
              </CardHeader>

              <UpdateProfileAvatar prevImageUrl={image} />
            </Card>

            {/* Details card */}
            <Card
              className={`w-full max-w-md gap-4 justify-self-center rounded-3xl border border-white/10 bg-linear-to-br from-slate-800/60 via-slate-900/70 to-slate-950/80 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/30 md:justify-self-start`}>
              <CardHeader className="place-items-center text-center">
                <div className="rounded-2xl bg-linear-to-br from-indigo-400/20 to-sky-500/20 p-3">
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    width={64}
                    height={64}
                    priority
                  />
                </div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <UserPen
                    size={22}
                    className="text-sky-400"
                  />
                  Update Details
                </CardTitle>
              </CardHeader>
              <UpdateProfileDetails prevName={name} />
            </Card>
          </section>
        </div>
      </main>
    </>
  );
};

export default page;
