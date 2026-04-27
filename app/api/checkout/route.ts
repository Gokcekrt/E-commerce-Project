import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function POST(req: Request) {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Sepetteki ürünleri body'den alıyoruz
    const { items } = await req.json();
console.log("API'ye gelen ürünler:", JSON.stringify(items, null, 2));
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // 1. Stripe'ın istediği formatta ürünleri hazırlıyoruz (line_items)
    const line_items = items.map((item: any) => ({
      price: item.stripePriceId, // Stripe'taki Fiyat ID'si
      quantity: item.quantity,    // Kaç adet alındığı
    }));

    // 2. Stripe Checkout Session oluşturuyoruz
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: line_items,
      success_url: `${process.env.AUTH0_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.AUTH0_BASE_URL}/cart`,
      metadata: {
        userId: session.user.sub, // Kimin satın aldığını Stripe'a not ediyoruz
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}