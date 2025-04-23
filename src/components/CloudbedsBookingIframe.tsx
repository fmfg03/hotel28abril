import React from 'react';

interface CloudbedsBookingIframeProps {
  lang?: string;
  start?: string;   // YYYY-MM-DD
  end?: string;     // YYYY-MM-DD
  adult?: number;
  children?: number;
  rooms?: number;
  promo?: string;
  currency?: string;
  height?: string;
}

const CloudbedsBookingIframe: React.FC<CloudbedsBookingIframeProps> = ({
  lang = 'es',
  start = '2025-04-28',
  end = '2025-04-30',
  adult = 2,
  children = 0,
  rooms = 1,
  promo = '',
  currency = 'MXN',
  height = '650'
}) => {
  const baseUrl = 'https://us2.cloudbeds.com/es/reservation/Od3X7u';
  const params = new URLSearchParams({
    lang,
    start,
    end,
    adult: adult.toString(),
    children: children.toString(),
    rooms: rooms.toString(),
    currency,
  });

  if (promo) params.append('promo', promo);

  const iframeUrl = `${baseUrl}?${params.toString()}`;

  return (
    <iframe
      src={iframeUrl}
      width="100%"
      height={height}
      frameBorder="0"
      title="Cloudbeds Booking"
      style={{ border: 'none' }}
    />
  );
};

export default CloudbedsBookingIframe;
