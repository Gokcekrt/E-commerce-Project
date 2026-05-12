import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
import { Link, LogOut } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth0.getSession(); //session kullanıcı bilgilerini alıyor
  if (!session) {
    redirect("/auth/login");
  }
  const { user } = session; //data structuring yaptık sürekli session.user.name gibi yazmamak için

  const userOrders = await prisma.order.findMany({
    where: {
      userEmail: user.email,
    },
    orderBy: {
      createdAt: "desc", // En yeni sipariş en üstte çıksın
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-8">
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35 rounded-t-lg" />
        <img
          src={user.picture || "https://avatar.vercel.sh/user.png"}
          alt={`${user.name}'s profile picture`}
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 rounded-t-lg"
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
            <LogOut>Sign Out</LogOut>
          </Link>
        </CardFooter>
      </Card>

      <div className="mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Order History</h2>

        {userOrders.length === 0 ? (
          <p className="text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="grid gap-4">
            {userOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-mono text-xs">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Paid
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-xl font-bold text-gray-800">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
