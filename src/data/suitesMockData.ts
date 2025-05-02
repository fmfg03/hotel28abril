
import { SuiteProps } from "@/types/Suite";

// Mock data to use while Supabase schema is being updated
export const mockSuites: SuiteProps[] = [
  {
    id: "1",
    name: "Sea View Suite",
    description: "Luxurious suite with beautiful sea views",
    price: 199,
    capacity: 2,
    size: 45,
    image: "/lovable-uploads/becstupakd_14-p-800.webp",
    location: "Ocean Wing",
    features: ["Wi-Fi", "Bathroom", "Kitchen"]
  },
  {
    id: "2",
    name: "Garden Suite",
    description: "Peaceful suite overlooking our tropical gardens",
    price: 149,
    capacity: 3,
    size: 50,
    image: "/lovable-uploads/bravofromh_20-p-800.webp",
    location: "Garden Wing",
    features: ["Wi-Fi", "Bathroom", "Kitchen"]
  },
  {
    id: "3",
    name: "Executive Suite",
    description: "Spacious suite with separate living area",
    price: 249,
    capacity: 4,
    size: 65,
    image: "/lovable-uploads/cofeebythepool.webp",
    location: "Executive Wing",
    features: ["Wi-Fi", "Bathroom", "Kitchen", "Workspace"]
  },
  {
    id: "4",
    name: "Signature Suite",
    description: "Our most luxurious accommodation with panoramic views",
    price: 299,
    capacity: 2,
    size: 70,
    image: "/lovable-uploads/feetbythepool.webp",
    location: "Signature Wing",
    features: ["Wi-Fi", "Bathroom", "Kitchen", "Jacuzzi", "Private Terrace"]
  }
];

export const mockSuiteImages = [
  {
    id: "img1",
    suite_id: "1",
    image_url: "/lovable-uploads/becstupakd_14-p-800.webp",
    alt_text: "Sea View Suite Main Image",
    order: 1
  },
  {
    id: "img2",
    suite_id: "1",
    image_url: "/lovable-uploads/bravofromh_20-p-800.webp",
    alt_text: "Sea View Suite Bathroom",
    order: 2
  }
];
