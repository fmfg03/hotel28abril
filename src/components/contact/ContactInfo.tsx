
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactInfo() {
  const { t } = useLanguage();
  return (
    <div className="animate-fade-in [animation-delay:100ms]">
      <h2 className="text-2xl font-bold mb-6">{t.contact.getInTouch}</h2>
      <div className="glass-card p-6 space-y-6 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">{t.contact.address}</h3>
            <p className="text-muted-foreground">
              123 Seaside Boulevard<br />
              Costa Bella, 12345<br />
              Italy
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">{t.contact.phone}</h3>
            <p className="text-muted-foreground">+39 123 4567 890</p>
            <p className="text-muted-foreground">+39 098 7654 321 (Reservations)</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">{t.contact.email}</h3>
            <p className="text-muted-foreground">info@maresereno.com</p>
            <p className="text-muted-foreground">reservations@maresereno.com</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">{t.contact.receptionHours}</h3>
            <p className="text-muted-foreground">
              Monday - Sunday: 24 hours<br />
              {t.contact.checkInTime}<br />
              {t.contact.checkOutTime}
            </p>
          </div>
        </div>
      </div>
      <div className="aspect-video rounded-xl overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03606358136!2d14.165818971864153!3d40.85529294646443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0a3c328d896b%3A0x309e11f99628150!2sGulf%20of%20Naples!5e0!3m2!1sen!2sus!4v1628613152777!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          title="Location Map"
        />
      </div>
    </div>
  );
}
