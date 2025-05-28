
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  email: string;
  firstName: string;
  lastName: string;
  bookingReference: string;
  suiteName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  totalPrice: number;
  paymentMethod: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingConfirmationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Morro Rock Suites <bookings@morrorock.com>",
      to: [bookingData.email],
      subject: `Booking Confirmation - ${bookingData.bookingReference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Booking Confirmation</h1>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Hello ${bookingData.firstName}!</h2>
            <p>Thank you for your booking. We're excited to host you at Morro Rock Suites!</p>
            <p><strong>Booking Reference:</strong> ${bookingData.bookingReference}</p>
          </div>

          <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Suite:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${bookingData.suiteName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Check-in:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${new Date(bookingData.checkInDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Check-out:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${new Date(bookingData.checkOutDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Nights:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${bookingData.nights}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Guests:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${bookingData.adults} Adults${bookingData.children > 0 ? `, ${bookingData.children} Children` : ''}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Payment Method:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${bookingData.paymentMethod === 'credit-card' ? 'Credit Card' : 'Pay at Property'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Total Price:</strong></td>
                <td style="padding: 8px 0; font-size: 18px; font-weight: bold; color: #007B7F;">$${bookingData.totalPrice}</td>
              </tr>
            </table>
          </div>

          <div style="background: #e8f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
            <p>You'll be redirected to our booking partner CloudBeds to complete the final booking process. Please keep this confirmation email for your records.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          </div>

          <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
            <p>Morro Rock Suites<br>
            Your Home Away From Home</p>
          </div>
        </div>
      `,
    });

    console.log("Booking confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending booking confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
