
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingMain from "./BookingMain";

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <BookingMain />
      </main>
      <Footer />
    </div>
  );
}
