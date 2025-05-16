import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCardInput } from "./utils";

interface PaymentInformationProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export default function PaymentInformation({
  formData,
  handleInputChange,
  handleSelectChange
}: PaymentInformationProps) {
  const [cardType, setCardType] = useState<string>("");

  // Format credit card number in groups of 4 digits
  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value) {
      // Detect card type based on first digits
      if (value.startsWith('34') || value.startsWith('37')) {
        setCardType('amex');
      } else if (value.startsWith('4')) {
        setCardType('visa');
      } else if (/^(5[1-5]|2[2-7])/.test(value)) {
        setCardType('mastercard');
      } else {
        setCardType('');
      }

      // Format the number with spaces
      if (cardType === 'amex') {
        // AMEX format: XXXX XXXXXX XXXXX (4-6-5)
        value = value.slice(0, 15);
        value = value.replace(/(\d{4})(\d{6})(\d{0,5})/, (_, p1, p2, p3) => 
          [p1, p2, p3].filter(Boolean).join(' '));
      } else {
        // Other cards format: XXXX XXXX XXXX XXXX
        value = value.slice(0, 16);
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      }
    }
    
    const syntheticEvent = {
      target: {
        name: 'cardNumber',
        value: value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value) {
      // Limit to 4 digits (MMYY)
      value = value.slice(0, 4);
      
      // Format as MM/YY
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      
      // Validate month (01-12)
      const month = parseInt(value.slice(0, 2));
      if (month > 12) {
        value = '12' + value.slice(2);
      } else if (month === 0 && value.length >= 2) {
        value = '01' + value.slice(2);
      }
    }
    
    const syntheticEvent = {
      target: {
        name: 'cardExpiry',
        value: value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };

  // Handle CVC format based on card type
  const formatCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    const maxLength = cardType === 'amex' ? 4 : 3;
    
    if (value) {
      value = value.slice(0, maxLength);
    }
    
    const syntheticEvent = {
      target: {
        name: 'cardCvc',
        value: value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <Tabs defaultValue="credit-card" onValueChange={v => handleSelectChange("paymentMethod", v)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
          <TabsTrigger value="pay-at-property">Pay at Property</TabsTrigger>
        </TabsList>
        <TabsContent value="credit-card" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Name on Card</Label>
            <Input
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number {cardType && `(${cardType})`}</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={formatCardNumber}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">Expiry Date</Label>
              <Input
                id="cardExpiry"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={formatExpiryDate}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardCvc">CVC {cardType === 'amex' ? '(4 digits)' : '(3 digits)'}</Label>
              <Input
                id="cardCvc"
                name="cardCvc"
                value={formData.cardCvc}
                onChange={formatCvc}
                placeholder={cardType === 'amex' ? "0000" : "000"}
                maxLength={cardType === 'amex' ? 4 : 3}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="pay-at-property" className="mt-4">
          <p className="text-muted-foreground">
            You will be required to provide a valid credit card upon arrival for security purposes, 
            but payment will be collected during your stay at the property.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
