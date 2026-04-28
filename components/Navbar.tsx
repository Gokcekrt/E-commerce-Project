"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Home,
  LogOut,
  LogIn,
  Heart,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";
import { Auth0SessionUser } from "@/lib/authz";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar({
  session,
  isAdmin,
}: {
  session: Auth0SessionUser | null;
  isAdmin?: boolean;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-slate-900 text-white text-[10px] uppercase tracking-widest py-2 text-center">
        Get 20% off on all skincare products. Limited time offer!
      </div>
      <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="font-bold text-xl flex items-center gap-2">
          <Link
            href="/"
            className="tracking-[0.2em] text-sm uppercase font-light text-slate-900"
          >
            <Heart className="w-6 h-6 text-blue-600" />
            Pure<span className="font-bold text-slate-950">Science</span>
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" /> Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {session ? (
              <>
                {isAdmin && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        href="/admin/products"
                        className="flex items-center"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2 text-blue-600" />{" "}
                        Admin
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/user/profile">
                      <User className="w-4 h-4 mr-2" /> Profile
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/auth/logout">
                      <LogOut className="w-4 h-4 mr-2 text-red-500" /> Logout
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/auth/login">
                      <LogIn className="w-4 h-4 mr-2 text-green-600" /> Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/auth/login?screen_hint=signup">
                      <UserPlus className="w-4 h-4 mr-2 text-blue-600" />
                      Sign Up
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
