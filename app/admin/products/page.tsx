import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProductAction } from "@/actions/productActions";

export default async function AdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  return (
    <main className="max-w-6xl mx-auto my-auto border rounded-lg overflow-hidden shadow-sm">
      <section className="w-full bg-white py-12 px-6 border-b ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-1">
            <h1 className="text-3xl font-light tracking-tighter text-slate-900 ">
              Product Management
            </h1>
          </div>

          <Button asChild variant="outline">
            <Link href="/admin/products/create">
              <Plus className="w-4 h-4 mr-2" /> Add New Product
            </Link>
          </Button>
        </div>
      </section>
      <div className="max-w-6xl mx-auto border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableCaption>A total of {products.length} products</TableCaption>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead className="w-[100px]">Product Id-Title</TableHead>

              <TableHead>Stock Status</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden border bg-slate-100">
                    <Image
                      src={product.images[0] || "/placeholder.jpg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    {product.title}
                    <div className="text-[10px] text-slate-400 font-mono">
                      ID: ...{product.id.slice(-6)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      product.stock > 10
                        ? "bg-green-100 text-green-700"
                        : product.stock > 0
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of Stock"}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {product.currency} {product.price.toFixed(2)}
                </TableCell>
                <TableCell className="  text-right space-x-2">
                  {/* Edit ve Delete Butonları */}
                  <div className="flex justify-center items-center gap-2">
                    <Button variant="ghost" className="h-8 w-8" asChild>
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={product.id} />
                      <Button
                        type="submit"
                        variant="ghost"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
