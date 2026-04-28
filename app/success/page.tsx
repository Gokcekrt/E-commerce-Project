import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <div>We could not find your order information.</div>;
  }

  // 1. Stripe'tan bu ödemenin detaylarını  çekiyoruz
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "line_items.data.price.product"], //sepetteki ürünlerin fiyat bilgisini paketini almak için expand ediyoruz
  });

  const customerName = session.customer_details?.name;
  const items = session.line_items?.data;

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
      </div>

      <h1 className="text-4xl font-light text-slate-900 mb-4 tracking-tight">
        Thank you, {customerName}!
      </h1>
      <p className="text-lg text-slate-500 mb-12 font-light">
        Your order has been placed successfully. We’re preparing your skincare
        essentials with care.
      </p>

      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left mb-10">
        <h2 className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-6">
          Order Summary
        </h2>
        <div className="space-y-6">
          {items?.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-slate-200 pb-4 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 bg-white rounded-md overflow-hidden border">
                  {item.price.product.images?.[0] && (
                    <Image
                      src={item.price.product.images[0]}
                      alt={item.description}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.description}
                  </p>
                  <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-900">
                ${(item.amount_total / 100).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-center">
          <span className="text-base font-medium text-slate-900">
            Total Paid
          </span>
          <span className="text-2xl font-bold text-blue-600">
            ${(session.amount_total! / 100).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button variant="outline" className="w-full sm:w-auto h-12 px-8">
            <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
          </Button>
        </Link>
        <Link href="/user/profile">
          <Button className="w-full sm:w-auto h-12 px-8 bg-slate-900">
            View Orders <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
