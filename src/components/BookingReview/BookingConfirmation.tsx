
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BookingConfirmationProps {
  email: string;
  reference: string;
}

export default function BookingConfirmation({ email, reference }: BookingConfirmationProps) {
  return (
    <div className="glass-card p-8 text-center animate-fade-in">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
      <p className="text-muted-foreground mb-6">
        Your reservation has been successfully confirmed. A confirmation email has been sent to {email}.
      </p>
      <p className="font-medium mb-8">
        Booking Reference: <span className="text-primary">{reference}</span>
      </p>
      <Button asChild className="btn-primary">
        <Link to="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}
