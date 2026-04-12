"use client";
import * as React from "react";
import Link from "next/link";
import {
  User,
  Home,
  PlusCircle,
  LogOut,
  LogIn,
  ShoppingBag,
} from "lucide-react"; // İkonlarımızı ekledik

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar({ session }: { session: any }) {
  // session propunu layouttan alıyoruz

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <div className="font-bold text-xl flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-blue-600" />
        <Link href="/">MyStore</Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Home className="w-4 h-4 mr-2" /> Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {session ? (
            <>
              <NavigationMenuItem>
                <Link href="/profile" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <User className="w-4 h-4 mr-2" /> Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/admin/create-product" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Create Product
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/auth/logout" className={navigationMenuTriggerStyle()}>
                  <LogOut className="w-4 h-4 mr-2 text-red-500" /> Logout
                </a>
              </NavigationMenuItem>
            </>
          ) : (
            <NavigationMenuItem>
              <a href="/auth/login" className={navigationMenuTriggerStyle()}>
                <LogIn className="w-4 h-4 mr-2 text-green-600" /> Login
              </a>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
