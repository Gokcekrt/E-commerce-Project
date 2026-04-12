import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await auth0.getSession(); //session kullanıcı bilgilerini alıyor
  if (!session) {
    redirect("/login");
  }
  const { user } = session; //data structuring yaptık sürekli session.user.name gibi yazmamak için

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src={user.picture || "https://avatar.vercel.sh/user.png"} // Kullanıcının profil resmi veya varsayılan resim
          alt={user.name}
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">Active User</Badge>
          </CardAction>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardFooter className="border-t bg-gray-50/50 p-4">
          <Button variant="destructive" className="w-full" asChild>
            <a href="/auth/logout">Sign Out</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
