
import GuestInformation from "./GuestInformation";
import PaymentInformation from "./PaymentInformation";

interface BookingGuestFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export default function BookingGuestForm({
  formData,
  handleInputChange,
  handleSelectChange
}: BookingGuestFormProps) {
  return (
    <form className="space-y-6">
      <GuestInformation 
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      <PaymentInformation 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
    </form>
  );
}
