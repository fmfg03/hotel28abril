
import { ReactNode } from "react";

type AmenityItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
};

export default function AmenityItem({ icon, title, description, index }: AmenityItemProps) {
  return (
    <div 
      className="glass-card p-6 rounded-xl flex flex-col items-center text-center animate-fade-in"
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
