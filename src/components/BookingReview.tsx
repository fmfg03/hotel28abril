
import { Check, CreditCard } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { SuiteProps } from "@/utils/calculateRoomSelection";
import { Link } from "react-router-dom";
import React from "react";

interface BookingReviewProps {
  selectedSuite: SuiteProps | null;
  startDate?: Date;
  endDate?: Date;
  adults: string;
  children: string;
  formData: any;
  isBookingConfirmed: boolean;
  isProcessing?: boolean;
  bookingReference?: string;
  onBack: () => void;
  onBookNow: () => void;
}

export default function BookingReview({
  selectedSuite,
  startDate,
  endDate,
  adults,
  children,
  formData,
  isBookingConfirmed,
  isProcessing = false,
  bookingReference,
  onBack,
  onBookNow
}: BookingReviewProps) {
  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const totalPrice = selectedSuite
    ? selectedSuite.price * nightsCount + 50 + 30
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      {!isBookingConfirmed ? (
        <>
          <h2 className="text-xl font-semibold mb-6">Review Booking Details</h2>
          <div className="glass-card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Accommodation Details</h3>
                {selectedSuite && (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={selectedSuite.image}
                        alt={selectedSuite.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{selectedSuite.name}</h4>
                      <p className="text-sm text-muted-foreground">{selectedSuite.location}</p>
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
                          <CreditCard className="h-4 w-4 mr-2" />
                          Credit Card (ending in {formData.cardNumber.slice(-4) || "****"})
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
          <div className="glass-card p-6 mb-8">
            <h3 className="text-lg font-medium mb-4">Price Summary</h3>
            <div className="space-y-2">
              {selectedSuite && (
                <>
                  <div className="flex justify-between items-center">
                    <span>
                      ${selectedSuite.price} x {nightsCount} {nightsCount === 1 ? "night" : "nights"}
                    </span>
                    <span className="font-medium">${selectedSuite.price * nightsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cleaning fee</span>
                    <span className="font-medium">$50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service fee</span>
                    <span className="font-medium">$30</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t mt-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">${totalPrice}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-3"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Privacy Policy</a>. I understand that my booking is subject to the property's cancellation policy.
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack} disabled={isProcessing}>Back</Button>
            <button
              className="btn-primary px-6 py-3 rounded-lg text-white font-bold bg-primary hover:bg-primary/90 transition-colors relative"
              onClick={onBookNow}
              disabled={!selectedSuite || !startDate || !endDate || isProcessing}
              type="button"
            >
              {isProcessing ? (
                <>
                  <span className="inline-block animate-spin mr-2">⟳</span> Processing...
                </>
              ) : (
                "Book Now on Cloudbeds"
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="glass-card p-8 text-center animate-fade-in">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your reservation has been successfully confirmed. A confirmation email has been sent to {formData.email}.
          </p>
          <p className="font-medium mb-8">
            Booking Reference: <span className="text-primary">{bookingReference || `MRS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`}</span>
          </p>
          <Button asChild className="btn-primary">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
