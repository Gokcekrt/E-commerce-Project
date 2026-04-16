import { Button } from "@/components/ui/button";

import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden border-b">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.jpg" // Buraya kendi bulduğun veya benim önerdiğim bir görseli koyabilirsin
            alt="Skincare Hero"
            fill
            className="object-cover " // Silik olması için opacity-20 verdik
            priority
          />
        </div>

        {/* İçerik (z-10 ile resmin üzerine çıkardık) */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-6 px-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-blue-600 font-bold block mb-2">
            Skincare and Skinfood
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tighter leading-tight">
            Nature’s Vitality{"   "}
            <span className="font-serif italic">Science-Backed.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto font-light leading-relaxed">
            Dermocosmetic solutions formulated by science and inspired by
            nature, now available at Purescience.
          </p>
        </div>
      </section>

      <section className="max-w-7xl w-full mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl font-light tracking-tight text-slate-900 uppercase">
              New Arrivals
            </h2>
            <div className="h-1 w-10 bg-blue-600 mt-2"></div>
          </div>
          <Link
            href="/products"
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest border-b border-transparent hover:border-blue-600 pb-1"
          >
            See All <ShoppingBag className="w-4 h-4 inline-block ml-1" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <Sparkles className="w-8 h-8 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-light italic">
              No products available at the moment. Please check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-3/4 overflow-hidden bg-[#f9f9f9] mb-4">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-x-4 bottom-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button className="w-full bg-white/90 backdrop-blur-sm text-slate-900 hover:bg-white rounded-none border-none shadow-xl text-[10px] uppercase tracking-widest font-bold h-10">
                      Quick View
                    </Button>
                  </div>
                </div>

                <div className="space-y-1 text-center">
                  <h3 className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                    Skin
                  </h3>
                  <h2 className="text-sm text-slate-800 font-medium group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h2>
                  <p className="text-sm font-bold text-slate-900 mt-2">
                    {product.price} {product.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
