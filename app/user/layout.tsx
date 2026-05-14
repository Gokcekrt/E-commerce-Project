import type { ReactNode } from "react";
import { requireUser } from "@/lib/authz";
import Link from "next/link";

import { UserCircle } from "lucide-react";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0 bg-white p-6 rounded-lg shadow-sm border border-slate-100 h-fit">
          <div className="mb-8 border-b pb-4">
            <h2 className="text-lg font-medium text-slate-900">My Account</h2>
            <p className="text-sm text-slate-500">{user.name || "Customer"}</p>
          </div>

          <nav className="flex-1 py-8 px-4 ">
            <Link
              href="/user/profile"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-900 bg-slate-50 rounded-md transition-colors"
            >
              <UserCircle className="w-4 h-4 mr-3 text-slate-400" />
              Profile Details
            </Link>
          </nav>
        </aside>

        <main className="flex-1 bg-white p-8 rounded-lg shadow-sm border border-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
}
