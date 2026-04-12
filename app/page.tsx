import { Button } from "@/components/ui/button";
import { auth0 } from "@/lib/auth0";
import Link from "next/link";
import { ShoppingBag, Link as LinkIcon } from "lucide-react";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full bg-slate-50 border-b py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Welcome to Our Market!
          </h1>
        </div>

        {session ? (
          <div>
            <p className="text-xl text-slate-600">
              Welcome again!
              <span className="font-bold text-slate-900">
                {session.user.name}
              </span>
            </p>

            <p>Check out the latest products we've picked just for you.</p>
          </div>
        ) : (
          <p className="text-xl text-slate-600">
            Welcome to our market! Please log in to access your profile and
            explore our features.
          </p>
        )}
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="secondary" className="h-12 px-8" asChild>
            <Link href="/products" passHref>
              <ShoppingBag className="w-4 h-4 m-auto" /> Product Details
            </Link>
          </Button>

          {!session && (
            <Button variant="outline" className="h-12 px-8" asChild>
              <a href="/auth/login">Log in</a>
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
