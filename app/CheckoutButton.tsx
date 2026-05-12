import { Button } from "@/components/ui/button";

export default async function CheckoutButton({ priceId }: { priceId: string }) {
  return (
    <form action="/api/checkout" method="POST">
      <input type="hidden" name="priceId" value={priceId} />
      <Button variant="addProduct" type="submit">
        Buy Now
      </Button>
    </form>
  );
}
