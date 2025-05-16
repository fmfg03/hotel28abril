
import { ReactNode } from "react";
import AmenityItem from "./AmenityItem";

type AmenityCategoryItem = {
  title: string;
  description: string;
};

type AmenityCategoryProps = {
  categoryName: string;
  categoryData: {
    title: string;
    description: string;
    items: AmenityCategoryItem[];
  };
  getIcon: (categoryName: string, index: number) => ReactNode;
  isEven: boolean;
};

export default function AmenityCategory({ 
  categoryName, 
  categoryData, 
  getIcon, 
  isEven 
}: AmenityCategoryProps) {
  return (
    <section className={`py-16 ${isEven ? 'bg-card' : ''}`}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {categoryData.title}
          </h2>
          <p className="text-muted-foreground">
            {categoryData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.items.map((item, index) => (
            <AmenityItem
              key={index}
              icon={getIcon(categoryName, index)}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
