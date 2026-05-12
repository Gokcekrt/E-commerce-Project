import Stripe from "stripe";

export type ExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product | Stripe.DeletedProduct;
  };
};