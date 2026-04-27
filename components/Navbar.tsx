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
  ShoppingCart,
} from "lucide-react";
import { Auth0SessionUser } from "@/lib/authz";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useCart } from "@/context/CartContext";

export default function Navbar({
  session,
  isAdmin,
}: {
  session: Auth0SessionUser | null;
  isAdmin?: boolean;
}) {
  const pathname = usePathname();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

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
            className="tracking-[0.2em] text-sm uppercase font-light text-slate-900 flex items-center gap-2"
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
                <Link href="/" className="flex items-center">
                  <Home className="w-4 h-4 mr-2" /> Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/cart" className="flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-2 text-indigo-600" /> Cart
                  {cartItemCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
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
                    <Link href="/user/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" /> Profile
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      href="/auth/logout"
                      className="flex items-center text-red-500"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
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
                    <Link
                      href="/auth/login"
                      className="flex items-center text-green-600"
                    >
                      <LogIn className="w-4 h-4 mr-2" /> Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      href="/auth/login?screen_hint=signup"
                      className="flex items-center text-blue-600"
                    >
                      <UserPlus className="w-4 h-4 mr-2" /> Sign Up
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
