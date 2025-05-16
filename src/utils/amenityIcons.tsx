
import { 
  Waves, 
  Bath,
  Dumbbell, 
  Utensils, 
  Coffee, 
  Clock, 
  Plane, 
  Car, 
  MapPin, 
  Music, 
  Waves as WavesIcon, 
  BookOpen, 
  Bell, 
  HelpCircle 
} from "lucide-react";
import { ReactNode } from "react";

export const getAmenityIcon = (categoryName: string, index: number): ReactNode => {
  const icons = {
    wellness: [<Waves key={0} />, <Bath key={1} />, <Dumbbell key={2} />],
    dining: [<Utensils key={0} />, <Coffee key={1} />, <Clock key={2} />, <MapPin key={3} />],
    mobility: [<Plane key={0} />, <Car key={1} />, <MapPin key={2} />],
    entertainment: [<Music key={0} />, <WavesIcon key={1} />, <BookOpen key={2} />],
    assistance: [<Bell key={0} />, <HelpCircle key={1} />] // Bell for concierge, HelpCircle for general assistance
  };
  
  return icons[categoryName as keyof typeof icons]?.[index] || <Coffee />;
};
