import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { Order } from "@prisma/client";

export default async function ProfilePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const { user } = session;

  // Hata yönetimi ve sipariş listesi için değişkenler
  let userOrders: Order[] = []; // "Bu, Order objelerinden oluşan bir listedir" dedik.
  let hasError = false;

  try {
    userOrders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (e) {
    console.error("Error fetching user orders:", e);
    hasError = true;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-8">
      <Card className="relative mx-auto w-full max-sm pt-0 overflow-hidden">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35 rounded-t-lg pointer-events-none" />

        <Image
          src={user.picture || "https://avatar.vercel.sh/user.png"}
          alt={`${user.name}'s profile picture`}
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          width={400}
          height={225}
          priority
        />

        <CardHeader>
          <CardAction>
            <Badge variant="secondary">Active User</Badge>
          </CardAction>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>

        <CardFooter className="border-t bg-gray-50/50 p-4">
          <Link
            href="/auth/logout"
            className={buttonVariants({ variant: "destructive" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Link>
        </CardFooter>
      </Card>

      {/* Sipariş Geçmişi Bölümü */}
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Order History</h2>

        {hasError ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium">
              Your orders could not be loaded at this time. Please try again
              later.
            </p>
          </div>
        ) : userOrders.length > 0 ? (
          /* Sipariş Listesi */
          <div className="grid gap-4">
            {userOrders.map((order) => (
              <Card
                key={order.id}
                className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="bg-gray-50/80 border-b pb-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                        Order ID
                      </p>
                      <p className="font-mono text-xs text-gray-700">
                        {order.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                        Order Date
                      </p>
                      <p className="font-medium text-sm">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 px-3 py-1"
                    >
                      Paid
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-xl font-extrabold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Boş Durum (Empty State) */
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">
              You haven't placed any orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
