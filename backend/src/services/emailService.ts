import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


const sendEmail = async (toEmail: string, orderId: string, totalAmount: number) => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Resend'in test hesapları için verdiği gönderici adresi
      to: [toEmail], // Stripe'tan gelen müşteri maili
      subject: 'Your Order is Confirmed!',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #333;">Thank you! We've received your order. 🛍️</h2>
          <p>Your order has been successfully created and is currently being prepared.</p>
          <hr />
          <p><strong>Order ID (Stripe ID):</strong> ${orderId}</p>
         <p><strong>Total Amount Paid:</strong> $${totalAmount.toFixed(2)}</p>
          <hr />
          <p>Thank you for choosing us!</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default {
  sendEmail
}