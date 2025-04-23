
import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="animate-fade-in [animation-delay:300ms]">
      <h2 className="text-2xl font-bold mb-6">{t.contact.sendMessage}</h2>
      <div className="glass-card p-6">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.contact.fullName}</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.contact.email}</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com" 
                  required 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t.contact.phoneNumber}</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t.contact.subject}</Label>
                <Input 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Reservation Inquiry" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t.contact.message}</Label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t.contact.howCanWeHelp} 
                className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background"
                required 
              />
            </div>
            <Button type="submit" className="w-full btn-primary">
              <Send className="mr-2 h-4 w-4" />
              {t.contact.send}
            </Button>
          </form>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.contact.messageSent}</h3>
            <p className="text-muted-foreground mb-6">{t.contact.thankYou}</p>
          </div>
        )}
      </div>
    </div>
  );
}
