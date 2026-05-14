
import { Request, Response, NextFunction } from 'express';
import { STRIPE_ENDPOINT_SECRET, stripe } from '../../common/stripe';

import emailService from '../../services/emailService'; 
import { PrismaClient, Prisma } from '@prisma/client';


const prisma = new PrismaClient();


const receiveUpdates = async (request: Request, response: Response, next: NextFunction) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (STRIPE_ENDPOINT_SECRET) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];

 
    if (!signature) {
      console.error('Stripe signature is missing from the request');
      return response.sendStatus(400);
    }

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        STRIPE_ENDPOINT_SECRET
      );
    } catch (err) {
      
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    // charge.succeeded, payment_intent.succeeded, payment_intent.created, checkout.session.completed
    case 'checkout.session.completed':
      const eventData = event.data.object;
      console.log(`Event data`);
      console.log(eventData);
      
     try{
      //stripedan sepetteki ürünleri line itemsla çektik
      const sessionWithItems = await stripe.checkout.sessions.retrieve(eventData.id, {
          expand: ['line_items'],
     });
     //customer_details ve amount_total stripe tarafından belirlenen özellikler.
     const lineItems = sessionWithItems.line_items?.data || [];
     const customerEmail= sessionWithItems.customer_details?.email || 'Unknown';
     const totalAmount= (sessionWithItems.amount_total || 0) / 100; // Stripe amount is in cents


     const userId = sessionWithItems.metadata?.userId; 




     if (!userId) {
    console.error("Error: User ID missing in metadata!");
    return response.status(400).send("User ID missing in metadata");
} 
      //veritabanına kaydetme işlemi
      const newOrder = await prisma.order.create({ //prisma order create ise kendi oluşturduğumuz modelin adı
        data: {
          userId: userId as string,
          totalAmount: totalAmount,
          stripeSessionId: eventData.id,
          items :lineItems as unknown as Prisma.InputJsonValue,
          status: "PAID",
      }});
      console.log(`New order created in database: ${newOrder.userId}`);
      await emailService.sendEmail(customerEmail, newOrder.id, totalAmount);

      for (const item of lineItems){
        const stripeProductId= item.price?.product as string;
        const quantityPurchased = item.quantity || 0;
        if(stripeProductId){
          const product = await prisma.product.findFirst({
            where: {stripeProductId: stripeProductId}
          });
          if(product && product.stock >= quantityPurchased){
            await prisma.product.update({
              where: {id: product.id},
              data: {stock: product.stock - quantityPurchased}
            });
            console.log(`Stock updated for product ${product.title}: new stock is ${product.stock - quantityPurchased}`);
          }
      }
    }}catch (dbError) {
        console.error("Database error occurred:", dbError);
      }
      break;
    case 'checkout.session.expired':
      
      console.log('Session expired.');
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
}


  


export default {
  receiveUpdates
}