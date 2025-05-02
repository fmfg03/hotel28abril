
import { Bath, Coffee, Wifi } from "lucide-react";

interface SuiteFeaturesProps {
  features: string[];
}

export default function SuiteFeatures({ features }: SuiteFeaturesProps) {
  return (
    <ul className="flex flex-wrap gap-3 mt-2">
      {features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center rounded-full border border-muted px-3 py-1 text-sm bg-white/75 dark:bg-background/60 backdrop-blur"
        >
          {feature === "Bathroom" && <Bath className="h-4 w-4 mr-1" />}
          {feature === "Kitchen" && <Coffee className="h-4 w-4 mr-1" />}
          {feature === "Wi-Fi" && <Wifi className="h-4 w-4 mr-1" />}
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
