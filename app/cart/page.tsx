"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }), // Tüm sepeti gönderiyoruz
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Stripe'a uçuyoruz! ✈️
      } else {
        alert(data.error || "Bir hata oluştu");
      }
    } catch (err) {
      console.error("Checkout hatası:", err);
      alert("Ödeme başlatılamadı.");
    }
  };
  // 1. Durum: Sepet Boşsa
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <ShoppingBag className="w-20 h-20 text-slate-200 mb-6" />
        <h1 className="text-2xl font-light text-slate-800 mb-2">
          Your cart is empty
        </h1>
        <p className="text-slate-500 mb-8 text-center max-w-md font-light">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 tracking-widest uppercase text-xs">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  // 2. Durum: Sepette Ürün Varsa
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-10 uppercase">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* SOL TARAF: Ürün Listesi */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 border-b pb-6 items-center"
            >
              {/* Ürün Resmi */}
              <div className="relative w-24 h-32 bg-slate-100 rounded-md overflow-hidden shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                    No Img
                  </div>
                )}
              </div>

              {/* Ürün Bilgileri ve Kontroller */}
              <div className="flex-1 flex flex-col justify-between h-full py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">${item.price}</p>
                  </div>
                  {/* Silme Butonu */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Adet Artırma / Azaltma (Anna'nın özellikle istediği kısım) */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-slate-200 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-slate-50 text-slate-600 disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-slate-50 text-slate-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-bold ml-auto text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SAĞ TARAF: Özet ve Ödeme */}
        <div className="bg-slate-50 p-8 rounded-xl h-fit border border-slate-100 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900 mb-6 uppercase tracking-wider">
            Order Summary
          </h2>

          <div className="space-y-4 text-sm text-slate-600 mb-6 border-b border-slate-200 pb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium font-mono uppercase text-[10px]">
                Free
              </span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-bold text-slate-900 mb-8">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <Button
            className="w-full bg-slate-900 text-white hover:bg-slate-800 h-12 text-md tracking-wider group"
            onClick={handleCheckout} // Artık fonksiyonu çağırıyor!
          >
            Checkout{" "}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
