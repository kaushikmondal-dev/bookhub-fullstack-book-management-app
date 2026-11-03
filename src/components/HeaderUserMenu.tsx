"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcnui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  LogOut,
  PlusCircle,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserMenuProps = {
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
};

const HeaderUserMenu = ({ name, email, image, role }: UserMenuProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2">
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={image ?? undefined}
            alt={name}
          />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="truncate font-semibold">{name}</p>
            <p className="text-muted-foreground truncate text-xs font-normal">
              {email}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem render={<Link href="/" />}>
          <LayoutDashboard /> Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/user-profile" />}>
          <User /> My Profile
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/book/create-book" />}>
          <PlusCircle /> Create Book
        </DropdownMenuItem>

        {role === "ADMIN" && (
          <DropdownMenuItem render={<Link href={"/"} />}>
            <ShieldCheck /> Admin Panel
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 hover:font-semibold focus:text-red-500">
          <LogOut color="red" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderUserMenu;
