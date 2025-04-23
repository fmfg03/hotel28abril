
import { Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactFAQ() {
  const { t } = useLanguage();
  const faqItems = [
    {
      questionKey: "checkInOut",
      icon: <Clock className="h-5 w-5 text-primary" />
    },
    {
      questionKey: "parking",
      icon: <MapPin className="h-5 w-5 text-primary" />
    },
    {
      questionKey: "pets",
      icon: <MapPin className="h-5 w-5 text-primary" />
    },
    {
      questionKey: "breakfast",
      icon: <MapPin className="h-5 w-5 text-primary" />
    },
    {
      questionKey: "transfers",
      icon: <MapPin className="h-5 w-5 text-primary" />
    },
    {
      questionKey: "amenities",
      icon: <MapPin className="h-5 w-5 text-primary" />
    },
  ];
  return (
    <section className="section bg-muted">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">{t.contact.faq}</h2>
          <p className="text-muted-foreground">{t.contact.faqSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in [animation-delay:200ms]">
          {faqItems.map((faq, index) => (
            <div key={index} className="glass-card p-6">
              <h3 className="font-semibold text-lg mb-2">
                {faq.icon}
                <span className="ml-2">{t.contact.questions[faq.questionKey].question}</span>
              </h3>
              <p className="text-muted-foreground">
                {t.contact.questions[faq.questionKey].answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
