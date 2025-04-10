
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Reservation {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
  roomId: string;
  roomName: string;
  price: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reservation } = await req.json() as { reservation: Reservation };
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Save the reservation to the database
    const { data, error: insertError } = await supabase
      .from('reservations')
      .insert([
        {
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
          check_in: reservation.checkIn,
          check_out: reservation.checkOut,
          guests: reservation.guests,
          message: reservation.message || null,
          room_id: reservation.roomId,
          room_name: reservation.roomName,
          price: reservation.price,
          status: 'pending'
        }
      ])
      .select()
      .single();
    
    if (insertError) {
      throw insertError;
    }
    
    // Send confirmation email (this is a placeholder - implement real email service as needed)
    console.log(`Reservation received from ${reservation.name} for ${reservation.roomName}`);
    console.log(`Check-in: ${reservation.checkIn}, Check-out: ${reservation.checkOut}`);
    
    return new Response(
      JSON.stringify({ 
        message: "Reservation received successfully", 
        id: data.id 
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error("Error processing reservation:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});
