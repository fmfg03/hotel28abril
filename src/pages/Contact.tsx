
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <ContactHeader />
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </section>
        <ContactFAQ />
      </main>
      <Footer />
    </div>
  );
}
