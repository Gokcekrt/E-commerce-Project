import Link from "next/link";
import { Lock } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f9] px-6 py-12 text-slate-900">
      <div className="w-full max-w-md bg-white border border-slate-100 shadow-sm rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-red-500" />
        </div>

        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-2">
          Access{" "}
          <span className="font-serif italic text-slate-800">Denied.</span>
        </h1>

        <p className="text-slate-500 font-light mb-8 leading-relaxed">
          You do not have the required permissions to view this page. This area
          is restricted to management only.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full rounded-none px-4 py-3 bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-blue-600 transition-colors shadow-lg"
          >
            Return to Homepage
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center w-full rounded-none px-4 py-3 bg-white text-slate-500 border border-slate-200 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </main>
  );
}
