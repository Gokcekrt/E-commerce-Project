import { requireAdmin } from "@/lib/authz";
import Link from "next/link";
import {
  Package,
  PlusCircle,
  ShoppingCart,
  LayoutDashboard,
  Heart,
  LogOut,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="font-bold text-xl flex items-center gap-2">
          <Heart className="w-6 h-6 text-blue-600" />
          <Link
            href="/"
            className="tracking-[0.2em] text-sm uppercase font-light text-slate-900"
          >
            Pure<span className="font-bold text-slate-950">Science</span>
          </Link>
        </div>
      </div>
      <div className="min-h-screen bg-[#f9f9f9] flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="h-20 flex items-center px-8 border-b border-slate-100">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">
              Management
            </span>
          </div>

          <nav className="flex-1 py-8 px-4 space-y-2">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 mr-3 text-slate-400" />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors"
            >
              <Package className="w-4 h-4 mr-3 text-slate-400" />
              Products
            </Link>
            <Link
              href="/admin/products/create"
              className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-3 text-slate-400" />
              Add Product
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors"
            >
              <ShoppingCart className="w-4 h-4 mr-3 text-slate-400" />
              Orders
            </Link>
            <Link
              href="/auth/logout"
              className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3 text-slate-400" />
              Logout
            </Link>
          </nav>
        </aside>

        <main className="flex-1">
          <div className="p-8 md:p-12 max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </>
  );
}
