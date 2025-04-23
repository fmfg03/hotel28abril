
import React from "react";
import { format } from "date-fns";
import { ApartmentProps } from "@/components/ApartmentCard";

interface BookingDetailsCardProps {
  selectedApartment: ApartmentProps | null;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    specialRequests?: string;
    paymentMethod: string;
    cardNumber?: string;
  };
}

export default function BookingDetailsCard({
  selectedApartment,
  startDate,
  endDate,
  adults,
  children,
  formData
}: BookingDetailsCardProps) {
  return (
    <div className="glass-card p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Accommodation Details</h3>
          {selectedApartment && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={selectedApartment.image}
                  alt={selectedApartment.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">{selectedApartment.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedApartment.location}</p>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span className="font-medium">{startDate ? format(startDate, "EEE, MMM d, yyyy") : "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span className="font-medium">{endDate ? format(endDate, "EEE, MMM d, yyyy") : "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-medium">
                    {adults} {parseInt(adults) === 1 ? "Adult" : "Adults"}
                    {parseInt(children) > 0 && `, ${children} ${parseInt(children) === 1 ? "Child" : "Children"}`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Guest Details</h3>
          <div className="space-y-4">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Address:</span>
                <span className="font-medium">{formData.address}</span>
              </div>
              <div className="flex justify-between">
                <span>City:</span>
                <span className="font-medium">{formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span>Country:</span>
                <span className="font-medium">{formData.country}</span>
              </div>
            </div>
            {formData.specialRequests && (
              <div>
                <h4 className="font-medium mb-1">Special Requests:</h4>
                <p className="text-sm text-muted-foreground">{formData.specialRequests}</p>
              </div>
            )}
            <div>
              <h4 className="font-medium mb-1">Payment Method:</h4>
              <p className="text-sm">
                {formData.paymentMethod === "credit-card" ? (
                  <span className="flex items-center">
                    Credit Card (ending in {formData.cardNumber?.slice(-4) || "****"})
                  </span>
                ) : (
                  "Pay at Property"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
