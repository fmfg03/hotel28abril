// Utility functions for card formatting
export const formatCardInput = {
  // Detects card type based on first digits
  detectCardType: (cardNumber: string): string => {
    if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
      return 'amex';
    } else if (cardNumber.startsWith('4')) {
      return 'visa';
    } else if (/^(5[1-5]|2[2-7])/.test(cardNumber)) {
      return 'mastercard';
    }
    return '';
  },
  
  // Formats the card number with proper spacing based on card type
  formatCardNumber: (value: string, cardType: string): string => {
    if (cardType === 'amex') {
      // AMEX format: XXXX XXXXXX XXXXX (4-6-5)
      return value.replace(/(\d{4})(\d{6})(\d{0,5})/, (_, p1, p2, p3) => 
        [p1, p2, p3].filter(Boolean).join(' '));
    } else {
      // Other cards format: XXXX XXXX XXXX XXXX
      return value.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
  }
};
